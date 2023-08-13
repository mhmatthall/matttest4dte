/**
 * Stub for the users API endpoint
 * @param {Request} req The incoming HTTP request object
 * @param {Response} res The outgoing HTTP response object
 * @returns {Response} A modified HTTP response object
 */
export default function handler(req, res) {
  return res.status(501).json({ message: "Not implemented" });
}
