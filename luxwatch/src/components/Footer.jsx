export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gold-600/10 pt-20 pb-10">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-accent text-2xl tracking-[0.4em] text-gold-400 mb-4">AURUM</div>
            <p className="font-body text-xs text-stone-600 leading-relaxed max-w-[180px]">
              Maison Aurum · Rue du Rhône 48 · Geneva, Switzerland · Est. 1887
            </p>
          </div>

          {[
            {
              heading: 'Collections',
              links: ['Aurum XII', 'GMT Series', 'Complications', 'Heritage Pieces'],
            },
            {
              heading: 'Maison',
              links: ['Our Story', 'Manufactures', 'Boutiques', 'Careers'],
            },
            {
              heading: 'Services',
              links: ['Personalisation', 'Warranty', 'Servicing', 'Authentication'],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="font-accent text-[0.6rem] tracking-[0.3em] text-gold-600 uppercase mb-6">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-xs text-stone-600 hover:text-gold-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="gold mb-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[0.6rem] text-stone-700 tracking-widest">
            © 2025 Maison Aurum. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Legal', 'Cookie Policy'].map((item) => (
              <a key={item} href="#"
                className="font-body text-[0.6rem] text-stone-700 hover:text-gold-500 transition-colors tracking-wider">
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
