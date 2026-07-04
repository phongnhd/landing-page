import { addSubscriber } from '../services/newsletter.service.js';

export async function subscribe(req, res, next) {
  try {
    const { fullName, email } = req.body;
    const result = addSubscriber({ fullName, email });

    if (result.duplicate) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed.',
      });
    }

    res.status(201).json({
      success: true,
      message: `Welcome aboard, ${fullName}! You're on the list.`,
      data: {
        id: result.subscriber.id,
        email: result.subscriber.email,
      },
    });
  } catch (error) {
    next(error);
  }
}
