const subscribers = new Map();

export function addSubscriber({ fullName, email }) {
  const normalizedEmail = email.toLowerCase();

  if (subscribers.has(normalizedEmail)) {
    return { duplicate: true };
  }

  const subscriber = {
    id: crypto.randomUUID(),
    fullName,
    email: normalizedEmail,
    subscribedAt: new Date().toISOString(),
  };

  subscribers.set(normalizedEmail, subscriber);
  return { duplicate: false, subscriber };
}

export function getSubscriberCount() {
  return subscribers.size;
}
