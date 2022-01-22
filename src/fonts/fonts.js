import { createGlobalStyle } from 'styled-components';

import Cornerstone from './Cornerstone.ttf';
import AkiraExpanded from './AkiraExpanded.otf';
import Montserrat from './Montserrat.ttf'
import VeganAbattoir from './VeganAbattoir.otf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Cornerstone';
        src: local('Cornerstone'),
        url(${Cornerstone}) format('woff');
    }

    @font-face {
        font-family: 'Akira Expanded';
        src local('AkiraExpanded'),
        url(${AkiraExpanded}) format('opentype');
    }
    
    @font-face {
        font-family: 'Montserrat'
        src: local('Montserrat'),
        Montserraturl(${Montserrat}) format('truetype');
    }
    
    @font-face {
        font-family: 'Vegan Abattoir';
        src: local('VeganAbattoir'),
        url(${VeganAbattoir}) format('opentype');
    }
`;