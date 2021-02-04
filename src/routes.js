import './MainComponent';
import './DetailsComponent';

const main = `
    <main-component id="main-comp"></main-component>
`;

const newRoute = `<details-component></details-component>`;

const routes = {
    '/': main,
    '/details': newRoute
}

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

window.onload = function(){
    document.getElementById('main-comp').addEventListener('routeChange', (e) => {
        onNavigate(e.detail);
    });
};

const onNavigate = (pathName) => {
    
    window.history.pushState(
        {},
        pathName,
        window.location.origin + pathName
    );
    rootDiv.innerHTML = routes[pathName];
}

window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname];
}