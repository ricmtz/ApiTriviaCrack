class DefaultValues {
    static defaultPage(req, res, next) {
        if (req.query) {
            if (typeof (req.query.page) === 'undefined') {
                req.query.page = 0;
            } else {
                req.query.page = Number(req.query.page);
            }
        }
        next();
    }

    static defaultUser(req, res, next) {
        req.body.admin = false;
        req.body.score = 0;
        req.body.avatar = 'default.png';
        req.body.lastlogin = new Date().toISOString();
        req.body.deleted = false;
        next();
    }

    static defaultFriend(req, res, next) {
        req.body.friendshipdate = new Date().toISOString();
        next();
    }

    static defaultEmail(req, res, next) {
        req.body.deleted = false;
        next();
    }

    static defaultGame(req, res, next) {
        req.body.answersplayer1 = 0;
        req.body.answersplayer2 = 0;
        req.body.createdate = new Date().toISOString();
        req.body.finished = false;
        req.body.deleted = false;
        next();
    }

    static defaultGameQuestion(req, res, next) {
        req.body.selectedoption = 'opt';
        req.body.correctoption = false;
        next();
    }

    static defaultQuestion(req, res, next) {
        req.body.approved = true;
        req.body.deleted = false;
        next();
    }

    static defaultCategory(req, res, next) {
        req.body.icon = 'default.png';
        req.body.deleted = false;
        next();
    }
}

module.exports = DefaultValues;
