import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import "/src/styles/styles.css";
import {Router} from "./router";

class App {
    constructor() {
        new Router();
    }
}

(new App());