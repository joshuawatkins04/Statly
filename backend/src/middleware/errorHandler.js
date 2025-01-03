const handleDuplicateKeyError = (error) => {
  const duplicateField = Object.keys(error.keyPattern || {})[0];
  return `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already in use.`;
};

const errorHandler = (err, req, res) => {
  console.error("[Global - errorHandler] ERROR:", err);
  
  const route = req?.method && req?.originalUrl ? `${req.method} ${req.originalUrl}` : "unknown route";
  const userIp = req?.ip || req?.headers["x-forwarded-for"] || "unknown IP";
  const userId = req?.user?.id || "unknown user ID";
  const userEmail = req?.user?.email || "unknown user email";

  console.error(`[Route]: ${route}`);
  console.error(`[User IP]: ${userIp}`);

  if (req?.user) {
    console.error(`[User ID]: ${userId}`);
    console.error(`[User Email]: ${userEmail}`);
  }

  // Authentication error
  if (err.message === "Invalid email or password.") {
    console.warn("[Global - errorHandler] Authentication failed.");
    return res.status(401).json({ message: err.message });
  }

  // Duplicate Key Error (MongoDB error code 11000)
  if (err.code === 11000) {
    return res.status(400).json({ message: handleDuplicateKeyError(err) });
  }

  // Validation Error (Mongoose ValidationError)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    console.warn("[Global - errorHandler] Validation Error:", messages);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Handle Auth Error
  if (err.name === "UnauthorizedError") {
    console.warn("[Global - errorHandler] Unauthorized Access.");
    return res.status(401).json({ message: "Unauthorized access." });
  }

  // Order Already Captured Error
  if (err.message.includes("Order already captured")) {
    console.warn("Error capturing payment:", err.message);
    return res.status(200).json({ message: "Order already captured" });
  }

  // Default to 500 Server Error
  console.error("[Global - errorHandler] Unhandled Error:", err.message);
  res.status(500).json({ message: "An unexpected server error occurred." });
};

module.exports = errorHandler;
