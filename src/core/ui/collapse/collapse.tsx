import { ReactNode, useState } from "react";


export const Collapse: React.FC<{
    title: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = () => setIsOpen(prev => !prev);

    return (
        <div style={{ borderRadius: 4, marginRight: 10 }}>
            <button
                onClick={toggle}
                style={{
                    width: '100%',
                    padding: '10px',
                    textAlign: 'left',
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                }}
                aria-expanded={isOpen}
                aria-controls="collapse-content"
            >

                {title}

                <div> {isOpen ? '▲' : '▼'}</div>
            </button>

            {isOpen && (
                <div id="collapse-content"  >
                    {children}
                </div>
            )}
        </div>
    );
};
