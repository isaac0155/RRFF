const passport = require('passport');
const { PORT } = require('../config');
const helpers = require('../lib/helpers');

var ret = (io) => {
    const express = require('express');
    const router = express.Router();
    const pool = require('../database');
    const { isLoggedIn } = require('../lib/auth')
    const { isAdminGen } = require('../lib/auth')
    const { isAdminSucur } = require('../lib/auth')
    const { isRespAmbulancia } = require('../lib/auth')
    const upload = require('../lib/storage')
    const { isNotLoggedIn } = require('../lib/auth')
    //centrosalud
    io.on("connection", (socket) => {
        socket.on('cliente:verifUser', async (user) => {
            let existe = await pool.query('select COUNT(a.usuario) as user from persona a where a.usuario = ?', user)
            existe[0].user == 0 ? socket.emit('server:usuarioLibre') : socket.emit('server:usuarioUsado');
        });
        socket.on('cliente:verifNit', async (nit) => {
            var existe = await pool.query('select COUNT(a.nit) as nit from nitcentro a where a.nit = ?', nit);
            if (existe[0].nit == 0) {
                socket.emit('server:nitLibre');
            } else {
                socket.emit('server:nitUsado')
            }
        });
    });

    /** */
    router.get('/profile/modify', isLoggedIn, async (req, res) => {
        //var persona = await pool.query('select * from persona where idPersona = ');
        //console.log(req.user);
        res.render('links/index');
    });
    router.post('/profile/modify', isLoggedIn, async (req, res) => {
        const validPassword = await helpers.matchPassword(req.body.passwordOld, req.user.password);
        if(validPassword){
            var passwordNew = await helpers.encryptPassword(req.body.password);
            await pool.query("update persona set password = ? where idPersona=?;", [passwordNew, req.user.idPersona]);
            req.flash('success', 'Contraseña Actualizada Correctamente')
        }else{
            req.flash('danger', 'Contraseña Actual Incorrecta')
        }
        res.redirect('/links/profile/modify');
        //console.log(req.body.passwordOld, req.user.password, validPassword);
        
    });
    /** */

    return router
}

module.exports = ret