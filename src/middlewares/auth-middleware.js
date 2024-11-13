export const authMiddleware = async (req, res, next) => {
  const sessionId = req.cookies.session_id;
  if (sessionId) {
    const session = await sessionRepository.getSession(sessionId);
    if (session) {
      req.userId = session.customerId;
    }
  }
  next();
};
