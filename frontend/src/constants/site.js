export const SITE = {
  name: 'OSMO',
  tagline: 'ACTION 6',
  cta: 'Đặt trước ngay',
  ctaSecondary: 'Xem demo',
};

export const NAV_LINKS = [
  { label: 'Tính năng', href: '#features' },
  { label: 'Thông số', href: '#specs' },
  { label: 'Thư viện', href: '#gallery' },
  { label: 'Bản tin', href: '#newsletter' },
];

export const FEATURES = [
  {
    icon: 'Brain',
    title: 'ALL-NEW 1/1.1-INCH SQUARE SENSOR',
      video: 'https://www-cdn.djiits.com/reactor/assets/_next/static/videos/c5591d8e-148d-47ee-9983-7d5697b41667.mp4?w=1386&h=960',
  },
  {
    icon: 'Shield',
    title: '50GB Built-in Storage',
   image:'https://www-cdn.djiits.com/dps/c0eabd1015aae327d9d4e3624d11ab5c.jpg?w=980&h=960',
  },
  {
    icon: 'Wifi',
    title: 'Cold-Resistant & 4-Hour Battery Life ',
  image: 'https://www-cdn.djiits.com/dps/81ef413e43ff09b605f8416ca251cb81.jpg?w=980&h=960',
  },
  {
    icon: 'Battery',
    title: 'Variable Aperture f/2.0-f/4.0',
  image: 'https://www-cdn.djiits.com/dps/eb34311e554ff9d14036cdccb694f327@origin.jpg?w=1386&h=800',
  },
  {
    icon: 'Monitor',
    title: 'OsmoAudio™ Direct Microphone Connection ',
    image: 'https://www-cdn.djiits.com/dps/7e1a8b56b486374b4bc15aebedb615cd@origin.jpg?w=1184&h=800',
  },
  {
    icon: 'Zap',
    title: '20m Waterproof  ',
   video: 'https://www-cdn.djiits.com/reactor/assets/_next/static/videos/5262cd8c-d05f-443f-aa10-708e6786ae60.mp4?w=1146&h=960',
  },
];

export const SPECIFICATIONS = [
  {
    category: 'Bộ xử lý',
    items: [
      { label: 'Chip', value: 'NextTech Neural X2' },
      { label: 'CPU', value: 'ARM 8 nhân @ 3.2 GHz' },
      { label: 'NPU', value: '12 TOPS AI trên thiết bị' },
      { label: 'RAM', value: '16 GB LPDDR5' },
    ],
  },
  {
    category: 'Pin',
    items: [
      { label: 'Dung lượng', value: '5.000 mAh' },
      { label: 'Sao lưu', value: 'Tối đa 72 giờ' },
      { label: 'Sạc', value: 'USB-C PD 65W' },
      { label: 'Không dây', value: 'Tương thích Qi2 15W' },
    ],
  },
  {
    category: 'Tính năng AI',
    items: [
      { label: 'Giọng nói', value: 'Xử lý ngôn ngữ đa ngôn ngữ' },
      { label: 'Thị giác', value: 'Nhận diện vật thể trên thiết bị' },
      { label: 'Học tập', value: 'Bộ máy tự động hóa thích ứng' },
      { label: 'Riêng tư', value: '100% xử lý cục bộ' },
    ],
  },
  {
    category: 'Kết nối',
    items: [
      { label: 'Wi-Fi', value: 'Wi-Fi 7 tri-band' },
      { label: 'Nhà thông minh', value: 'Matter, Thread, Zigbee' },
      { label: 'Bluetooth', value: '5.4 LE Audio' },
      { label: 'Cổng', value: 'USB-C, Ethernet, HDMI' },
    ],
  },
  {
    category: 'Màn hình',
    items: [
      { label: 'Kích thước', value: 'OLED 7 inch tràn viền' },
      { label: 'Độ phân giải', value: '3840 × 2160' },
      { label: 'Độ sáng', value: 'Đỉnh 1.000 nits' },
      { label: 'Cảm ứng', value: 'Đa điểm phản hồi rung' },
    ],
  },
  {
    category: 'Bảo mật',
    items: [
      { label: 'Mã hóa', value: 'AES-256 + HSM' },
      { label: 'Xác thực', value: 'Nhận diện khuôn mặt + vân tay' },
      { label: 'Cập nhật', value: 'OTA an toàn hằng tháng' },
      { label: 'Chứng nhận', value: 'FIPS 140-3 Level 3' },
    ],
  },
  {
    category: 'Tương thích',
    items: [
      { label: 'Hệ sinh thái', value: 'Apple, Google, Amazon' },
      { label: 'Thiết bị', value: 'Hỗ trợ hơn 500 thiết bị' },
      { label: 'API', value: 'REST + WebSocket SDK' },
      { label: 'HĐH', value: 'iOS 16+, Android 12+' },
    ],
  },
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Phòng khách',
    alt: 'Trung tâm NextTech trên kệ phòng khách hiện đại điều khiển ánh sáng xung quanh',
    gradient: 'from-blue-600/40 to-purple-600/40',
  },
  {
    id: 2,
    title: 'Nhà bếp',
    alt: 'Màn hình NextTech hiển thị điều khiển thiết bị bếp và gợi ý công thức',
    gradient: 'from-emerald-600/40 to-teal-600/40',
  },
  {
    id: 3,
    title: 'Văn phòng tại nhà',
    alt: 'NextTech trên bàn làm việc quản lý thiết bị văn phòng thông minh và lịch làm việc',
    gradient: 'from-amber-600/40 to-orange-600/40',
  },
  {
    id: 4,
    title: 'Không gian phòng ngủ',
    alt: 'NextTech điều khiển ánh sáng phòng ngủ, nhiệt độ và thói quen ngủ',
    gradient: 'from-indigo-600/40 to-violet-600/40',
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Tính năng', href: '#features' },
    { label: 'Thông số', href: '#specs' },
    { label: 'Thư viện', href: '#gallery' },
    { label: 'Đặt trước', href: '#newsletter' },
  ],
  company: [
    { label: 'Giới thiệu', href: '#' },
    { label: 'Tuyển dụng', href: '#' },
    { label: 'Báo chí', href: '#' },
    { label: 'Liên hệ', href: '#' },
  ],
  legal: [
    { label: 'Chính sách quyền riêng tư', href: '#' },
    { label: 'Điều khoản dịch vụ', href: '#' },
    { label: 'Chính sách cookie', href: '#' },
  ],
};
