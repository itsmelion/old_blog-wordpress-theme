if (module && module.hot) {
    module.hot.accept();
}

// Importing images
const importAll = (r: any) => {
    return r.keys().map(r);
};

const images = importAll(
    require.context(
        './images',
        true,
        /\.(jpe?g|png|gif|svg)/,
    ),
);

import './main.scss';

import $ from 'jquery'; // import "jquery/dist/jquery";
import "pace-js"; // pace-js/pace.js
import "slick-carousel/slick/slick"; // slick-carousel/slick/slick
// import "src/scripts/vendors/*.js";

require('tether/dist/js/tether');
require('tether-drop/dist/js/drop');

import "./scripts/core/job-board-Query";
import "./scripts/core/drop";
import "./scripts/lazy/caroussels";
import "./scripts/lazy/collapsable";
