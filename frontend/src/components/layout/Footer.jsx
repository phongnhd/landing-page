import { SITE, FOOTER_LINKS } from '../../constants/site';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useState } from 'react';

function FooterColumn({ title, links, onLinkClick, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-b-0 sm:border-b-0 sm:pb-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full sm:cursor-default sm:pointer-events-none focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 -mx-2"
        aria-expanded={isOpen}
        aria-controls={`footer-section-${title.replace(/\s/g, '-')}`}
        id={`footer-button-${title.replace(/\s/g, '-')}`}
      >
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider py-2 sm:py-0">
          {title}
        </h3>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform duration-300 sm:hidden ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <ul 
        className={`space-y-2.5 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-3' : 'max-h-0 mt-0'
        } sm:max-h-full sm:mt-0`}
        id={`footer-section-${title.replace(/\s/g, '-')}`}
        role="list"
        aria-labelledby={`footer-button-${title.replace(/\s/g, '-')}`}
      >
        {links.map((link) => (
          <li key={link.label} role="listitem">
            <a
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  onLinkClick(link.href);
                }
              }}
              className="text-sm text-white/50 hover:text-white focus:text-white transition-colors duration-200 block sm:inline focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 -mx-2"
              aria-label={`${link.label} - ${title}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const scrollTo = useScrollToSection();
  const year = new Date().getFullYear();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleColumn = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const footerData = {
    columns: [
      { title: "MUA SẮM", links: [{ label: "Cửa hàng DJI Online", href: "#" }, { label: "Cửa hàng DJI-Operated", href: "#" }, { label: "Cửa hàng bán lẻ", href: "#" }, { label: "Nhà bán lẻ doanh nghiệp", href: "#" }, { label: "Đại lý máy bay nông nghiệp", href: "#" }, { label: "Đại lý máy bay giao hàng", href: "#" }] },
      { title: "SẢN PHẨM", links: [{ label: "Camera gimbal", href: "#" }, { label: "Máy ảnh hành động", href: "#" }, { label: "Trạm điện di động", href: "#" }, { label: "Phụ kiện", href: "#" }, { label: "Linh kiện", href: "#" }] },
      { title: "HỖ TRỢ", links: [{ label: "Trung tâm bảo hành", href: "#" }, { label: "Mẹo bay", href: "#" }, { label: "Blog DJI", href: "#" }, { label: "Diễn đàn DJI", href: "#" }, { label: "Hướng dẫn mua hàng", href: "#" }, { label: "Chính sách dịch vụ sau bán hàng", href: "#" }] },
      { title: "KẾT NỐI", links: [{ label: "Trung tâm truyền thông", href: "#" }, { label: "SkyPixel", href: "#" }, { label: "RoboMaster", href: "#" }, { label: "Đăng ký nhận tin", href: "#" }, { label: "Tải ứng dụng DJI Store", href: "#" }] },
      { title: "CÔNG TY", links: [{ label: "Về chúng tôi", href: "#" }, { label: "Liên hệ", href: "#" }, { label: "Tuyển dụng", href: "#" }, { label: "Hợp tác", href: "#" }, { label: "Trở thành đại lý", href: "#" }, { label: "Đăng ký cửa hàng ủy quyền", href: "#" }] }
    ]
  };

  return (
    <footer className="bg-[#272727] border-t border-white/5" role="contentinfo" aria-label="Chân trang">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-x-8 sm:gap-y-10">
            {footerData.columns.map((column, index) => (
              <FooterColumn
                key={index}
                title={column.title}
                links={column.links}
                onLinkClick={scrollTo}
                isOpen={openIndex === index}
                onToggle={() => toggleColumn(index)}
              />
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} 
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
              aria-label="Về đầu trang"
            >
              <img src="/logo.png" alt="NextTech - Trang chủ" className="h-6 w-auto object-contain brightness-0 invert" />
            </a>
            <p className="text-xs text-white/40 text-center sm:text-left">
              Bản quyền &copy; {year} phongnhd. Mọi quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-4 text-xs flex-wrap justify-center sm:justify-start">
              <a href="#" className="text-white/40 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 -mx-2">
                Chính sách bảo mật
              </a>
              <span className="text-white/40 text-base font-bold hidden sm:inline" aria-hidden="true">·</span>
              <a href="#" className="text-white/40 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 -mx-2">
                Sử dụng Cookie
              </a>
              <span className="text-white/40 text-base font-bold hidden sm:inline" aria-hidden="true">·</span>
              <a href="#" className="text-white/40 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 -mx-2">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-5" role="group" aria-label="Mạng xã hội">
            <a 
              href="https://github.com/phongnhd" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
              aria-label="GitHub - Phong NHD" 
              referrerPolicy="no-referrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            
            <a 
              href="https://phongnhd.site/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
              aria-label="Portfolio - Phong NHD" 
              referrerPolicy="no-referrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/phongnhd/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
              aria-label="LinkedIn - Phong NHD" 
              referrerPolicy="no-referrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}