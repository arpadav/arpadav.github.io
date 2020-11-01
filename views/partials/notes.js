import {readJSON, create_link_listing} from '../../public/js/technicals.js';

// read from notes_school.json
readJSON('../partials/notes_school.json', 'school', create_link_listing);
// read from notes_personal.json
// readJSON('../partials/notes_personal.json', 'personal', create_link_listing);
