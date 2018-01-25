if (module && module.hot) {
    module.hot.accept();
}

import "jquery/dist/jquery";
import "pace-js"; // pace-js/pace.js
import "slick-carousel"; // slick-carousel/slick/slick
import "src/scripts/vendors/*.js";
import "tether"; // tether/dist/js/tether
import "tether-drop"; // tether-drop/dist/js/drop

import './main.scss';

console.log("Loaded Index.ts");
