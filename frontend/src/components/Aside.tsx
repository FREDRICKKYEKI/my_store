import { useEffect } from 'react';

export const Aside = () => {
  useEffect(() => {
    document.getElementById('aside-container')?.classList.remove('open');
    document
      .getElementById('aside-close-button')
      ?.addEventListener('click', async () => {
        document.getElementById('aside-container')?.classList.remove('open');
      });
    return () => {
      document
        .getElementById('aside-close-button')
        ?.removeEventListener('click', async () => {
          document.getElementById('aside-container')?.classList.remove('open');
        });
    };
  }, []);

  return (
    <>
      <div className='aside-header'>
        <div>SHOP BY CATEGORY</div>
        <button className='aside-close-button' id='aside-close-button'>
          x
        </button>
      </div>
      <div className='aside-body'>
        <ul className='categories'>
          <li>
            <a href='/?q=shirt'>
              Shirts
              <span>
                <i className='fa fa-chevron-right'></i>
              </span>
            </a>
          </li>
          <li>
            <a href='/?q=pant'>
              Pants
              <span>
                <i className='fa fa-chevron-right'></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
