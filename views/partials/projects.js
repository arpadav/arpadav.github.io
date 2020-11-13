import {readJSON, create_iframes} from '../../public/js/technicals.js';
import init from '../../public/js/projects.js';

// read from projects_personal.json
readJSON('../partials/projects_personal.json', ['personal', init], create_iframes);
// read from projects_academic.json
readJSON('../partials/projects_academic.json', ['academic', init], create_iframes);
// read from projects_professional.json
readJSON('../partials/projects_professional.json', ['professional', init], create_iframes);
