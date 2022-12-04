import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
      --primary-color: #cc5500;
      --accent-bg-color: rgba(204, 85, 0, 0.1);
      --page-horizontal-padding: 20px;
      --header-height: 50px;
      --max-content-width: 1200px;
      --heading-font-family: 'Teko', sans-serif;
      --user-img-width: 120px;
--full-width:calc(100vw - 60px);
--sidebar-width:60px
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;
