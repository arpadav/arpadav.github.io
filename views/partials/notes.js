import {readJSON, create_link_listing} from '../../public/js/technicals.js';

// read from notes_academic.json
readJSON('../partials/notes_academic.json', 'academic', create_link_listing);
// read from notes_personal.json
// readJSON('../partials/notes_personal.json', 'personal', create_link_listing);
