// role
const ADMIN = 'admin';
const USER = 'user';
// url
const USERS = 'users';
const EMAILS = 'emails';
const FRIENDS = 'friends';
const CATEGORIES = 'categories';
const ANSWERS = 'answers';
const GAMES = 'games';
const QUESTIONS = 'questions';
// method
const GET = 'GET';
const POST = 'POST';
const PATCH = 'PATCH';
const DELETE = 'DELETE';
// path
const PATH_ROOT = '/';
const PATH_NICKNAME = '/:nickname';
const PATH_FRIEND = '/:friendNickname';
const PATH_CATEGORY = '/:categoryId';
const PATH_GAME = ':gameId';
const PATH_QUESTION = '/:question';
const PATH_ANSWERS = '/:questionId';

class Authorization {
    constructor() {
        this.permissions = [
            {
                rol: ADMIN,
                permission: [
                    {
                        url: USERS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_NICKNAME, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_NICKNAME, method: DELETE },
                            { path: PATH_NICKNAME, method: PATCH },
                        ],
                    },
                    {
                        url: EMAILS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_ROOT, method: DELETE },
                            { path: PATH_ROOT, method: PATCH },
                        ],
                    },
                    {
                        url: FRIENDS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_FRIEND, method: DELETE },
                            { path: PATH_ROOT, method: PATCH },
                        ],
                    },
                    {
                        url: CATEGORIES,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_CATEGORY, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_CATEGORY, method: DELETE },
                            { path: PATH_CATEGORY, method: PATCH },
                        ],
                    },
                    {
                        url: GAMES,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_GAME, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_GAME, method: DELETE },
                            { path: PATH_GAME, method: PATCH },
                        ],
                    },
                    {
                        url: QUESTIONS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_QUESTION, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_QUESTION, method: DELETE },
                            { path: PATH_QUESTION, method: PATCH },
                        ],
                    },
                    {
                        url: ANSWERS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_ANSWERS, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_ANSWERS, method: DELETE },
                            { path: PATH_ANSWERS, method: PATCH },
                        ],
                    },
                ],
            },
            {
                rol: USER,
                permission: [
                    {
                        url: USERS,
                        routes: [
                            { path: PATH_NICKNAME, method: GET },
                            { path: PATH_NICKNAME, method: DELETE },
                            { path: PATH_NICKNAME, method: PATCH },
                        ],
                    },
                    {
                        url: EMAILS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_ROOT, method: DELETE },
                            { path: PATH_ROOT, method: PATCH },
                        ],
                    },
                    {
                        url: FRIENDS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_FRIEND, method: DELETE },
                            { path: PATH_ROOT, method: PATCH },
                        ],
                    },
                    {
                        url: CATEGORIES,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_CATEGORY, method: GET },
                        ],
                    },
                    {
                        url: GAMES,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_GAME, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_GAME, method: DELETE },
                            { path: PATH_GAME, method: PATCH },
                        ],
                    },
                    {
                        url: QUESTIONS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_QUESTION, method: GET },
                            { path: PATH_ROOT, method: POST },
                        ],
                    },
                    {
                        url: ANSWERS,
                        routes: [
                            { path: PATH_ROOT, method: GET },
                            { path: PATH_ANSWERS, method: GET },
                            { path: PATH_ROOT, method: POST },
                            { path: PATH_ANSWERS, method: DELETE },
                        ],
                    },
                ],
            },
        ];
        this.canDo = this.canDo.bind(this);
    }

    canDo(rol, user, req) {
        const url = req.baseUrl.split(PATH_ROOT);
        const { path } = req.route;
        const { method } = req;
        const rolPermissions = this.getRolPermissions(rol);
        if (rolPermissions === null) {
            return false;
        }
        const urlPermissions = this.getUrlPermissions(
            rolPermissions.permission, url[url.length - 1],
        );
        if (urlPermissions === null) {
            return false;
        }
        const permission = this.getPermission(
            urlPermissions.routes, path, method,
        );
        if (permission === null) {
            return false;
        }
        return this.getRestrictions(rol, user, req);
    }

    getRolPermissions(rol) {
        for (let i = 0; i < this.permissions.length; i += 1) {
            if (this.permissions[i].rol === rol) {
                return this.permissions[i];
            }
        }
        return null;
    }

    getUrlPermissions(permissions, url) {
        for (let i = 0; i < permissions.length; i += 1) {
            if (permissions[i].url === url) {
                return permissions[i];
            }
        }
        return null;
    }

    getPermission(permissions, path, method) {
        for (let i = 0; i < permissions.length; i += 1) {
            if (permissions[i].path === path
                && permissions[i].method === method
            ) {
                return permissions[i];
            }
        }
        return null;
    }

    getRestrictions(rol, user, req) {
        const url = req.baseUrl.split(PATH_ROOT);
        const urlName = url[url.length - 1];
        // const { method } = req;
        if (rol === USER) {
            if (urlName === USERS || urlName === EMAILS || urlName === FRIENDS) {
                if (req.params.nickname !== user) {
                    return false;
                }
            }
        }
        return true;
    }
}

module.exports = new Authorization();
