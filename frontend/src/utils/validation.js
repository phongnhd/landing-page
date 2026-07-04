export function validateNewsletterForm({ fullName, email }) {
  const errors = {};

  const trimmedName = fullName?.trim() ?? '';
  const trimmedEmail = email?.trim() ?? '';

  if (!trimmedName) {
    errors.fullName = 'Vui lòng nhập họ tên';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
  } else if (trimmedName.length > 100) {
    errors.fullName = 'Họ tên phải dưới 100 ký tự';
  }

  if (!trimmedEmail) {
    errors.email = 'Vui lòng nhập email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: { fullName: trimmedName, email: trimmedEmail },
  };
}
