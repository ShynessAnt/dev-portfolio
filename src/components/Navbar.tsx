import { Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import styles from './Navbar.module.css';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const originalOverflow = document.body.style.overflow;

    const updateScrollLock = (): void => {
      document.body.style.overflow = mobileQuery.matches
        ? 'hidden'
        : originalOverflow;
    };

    updateScrollLock();
    mobileQuery.addEventListener('change', updateScrollLock);
    window.addEventListener('resize', updateScrollLock);

    return () => {
      document.body.style.overflow = originalOverflow;
      mobileQuery.removeEventListener('change', updateScrollLock);
      window.removeEventListener('resize', updateScrollLock);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Marca minimalista ANTO con acento característico */}
        <NavLink className={styles.brand} to="/" aria-label="Ir a inicio">
          ANTO<span className={styles.brandDot}>.</span>
        </NavLink>

        {/* Menú de enlaces en píldora flotante */}
        <nav
          id={menuId}
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Navegación principal"
        >
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acciones: selector de tema y botón de menú móvil */}
        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => {
              setOpen((value) => !value);
            }}
          >
            {open ? (
              <X size={18} aria-hidden />
            ) : (
              <Menu size={18} aria-hidden />
            )}
            <span className="sr-only">
              {open ? 'Cerrar menú' : 'Abrir menú'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
