import {readJSON, create_iframes} from '../../public/js/technicals.js';
import init from '../../public/js/projects.js';

// read from projects_personal.json
readJSON('../partials/projects_personal.json', ['personal', null], create_iframes);
// read from projects_school.json
readJSON('../partials/projects_school.json', ['school', init], create_iframes);
