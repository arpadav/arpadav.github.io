import {readJSON, create_link_listing, create_iframes} from '../../public/js/technicals.js';
import init from '../../public/js/projects.js';

// read from notes_academic.json
readJSON('../partials/notes_academic.json', 'academic', create_link_listing);
// read from notes_personal.json
readJSON('../partials/notes_personal.json', ['personal', init], create_iframes);
