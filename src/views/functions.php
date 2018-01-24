<?php
/**
 * Author: Robert DeVore | @deviorobert
 * URL: html5blank.com | @html5blank
 * Custom functions, support, custom post types and more.
 */

require_once 'modules/is-debug.php';


// Load HTML5 Blank scripts (header.php)
function html5blank_header_scripts() {
    if ( $GLOBALS['pagenow'] != 'wp-login.php' && ! is_admin() ) {
        if ( HTML5_DEBUG ) {

            // Conditionizr
            wp_register_script( 'conditionizr', get_template_directory_uri() . '/commons.js', array(), '4.3.0', true );

            // Modernizr
            wp_register_script( 'modernizr', get_template_directory_uri() . '/main.js', array(), '2.8.3', true);

            wp_enqueue_script( 'conditionizr' );
            wp_enqueue_script( 'modernizr' );


        // If production
        } else {
            // Conditionizr
            wp_register_script( 'conditionizr', get_template_directory_uri() . '/commons.js', array(), '4.3.0', true );

            // Modernizr
            wp_register_script( 'modernizr', get_template_directory_uri() . '/main.js', array(), '2.8.3', true);
            // Enqueue Scripts
            wp_enqueue_script( 'conditionizr' );
            wp_enqueue_script( 'modernizr' );
        }
    }
}

// Load HTML5 Blank styles
function html5blank_styles() {
    if ( HTML5_DEBUG ) {

        // Custom CSS
        wp_register_style( 'html5blank', get_template_directory_uri() . '/main.css', array( ), '1.0' );

        // Register CSS
        wp_enqueue_style( 'html5blank' );
    } else {
        // Custom CSS
        wp_register_style( 'html5blankcssmin', get_template_directory_uri() . '/main.css', array(), '1.0' );
        // Register CSS
        wp_enqueue_style( 'html5blankcssmin' );
    }
}


// Add Actions
add_action( 'wp_enqueue_scripts', 'html5blank_header_scripts' ); // Add Custom Scripts to wp_head
add_action( 'wp_enqueue_scripts', 'html5blank_styles' ); // Add Theme Stylesheet
