function index(req, res) {

    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM tasks', (err, tasks) =>{
            if(err) {
                res.json(err);
            }
            res.render('tasks/index', { tasks } );
        });
    });

   
}
function create(req, res) {
    
    res.render('tasks/create');
}

function store(req, res) {
    const data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO tasks SET ?',[data], (err, rows) =>{
            res.redirect('/tasks');
        })
    });
}

function destroy(req, res) {
    const ID = req.body.ID;
    
    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM tasks WHERE ID = ?', [ID], (err, rows) =>{
            res.redirect('/tasks');
        });
    })

}

function edit(req, res) {
    const ID = req.params.ID;

    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM tasks WHERE ID = ?',[ID], (err, tasks) =>{
            if(err) {
                res.json(err);
            }
            res.render('tasks/edit', { tasks });
        });
    });

    

}

function update(req, res) {
    const ID = req.params.ID;
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE tasks SET ? WHERE ID = ?', [data, ID], (err, rows) => {
            res.redirect('/tasks');
        });

    });

}

module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}