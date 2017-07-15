module.exports = new (require('../controller.js'))({
    url: '/api',
    dependencies: {
        ac: require('../db/articleDbController.js'),
    }
})
.bind((router, dependencies) => {
    router.get('/article', (req, res) => {
        const ac = dependencies['ac'];
        const query = req.query;
        ac.find(query).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.redirect('/error/500');
        })
        
    })

    router.get('/sth', (req, res) => {
        res.send('sth');
    })

    router.post('/article', (req, res) => {
        // 上传新文章, 需要权限控制
        const ac = dependencies['ac'];
        const data = req.body;
        if (!data.file_name) {
            res.status(400).send({code: 0, msg: '文章格式错误，提交失败!'});
            return false;
        }
        if (true) {
            ac.find({file_name: data.file_name}).then((res_data) => {
                if (res_data.length !== 0) {
                    return new Promise(() => {
                        let err = new Error();
                        err.code = 2;
                        throw(err);
                    });
                } else {
                    return ac.add(data);
                }
            }).then((err) => {
                res.send({code: 1, msg: '文章成功提交!'});
            }).catch((err) => {
                switch (err.code) {
                    case 2: 
                        res.status(400).send({code: 0, msg: '文件名已存在，请更换文件名。'});
                        break;
                    default:
                        res.status(400).send({code: 0, msg: '出了些情况，提交失败!'});
                }
            });
        } else {
            res.send({code: 0, msg: '您没权限提交文章!'});
        }
    })

    router.delete('/article', (req, res) => {
        // 上传新文章, 需要权限控制
        const ac = dependencies['ac'];        
        const data = req.body;
        if (true) {
            ac.remove(data).then(() => {
                res.send({code: 1, msg: '文章成功删除!'});
            }).catch((err) => {
                res.send({code: 0, msg: '出了些情况，删除失败!'});
            });
        } else {
            res.send({code: 0, msg: '您没权限删除文章!'});
        }
    })

    router.post('/file', (req, res) => {
        // 上传文件
        res.send({msg: 'not open', code: 0});
    })

    // router.get('/:article_name', (req, res) => {
    //     let article_name = req.params.article_name;
    //     res.send(article_name);
    // })
})