import { Controller, Get, Res, Req, Session, Body, Post, Query } from "@nestjs/common";
import { ProductosService } from "./hijo.service";
import { LoginService } from "../Login/login.service";
import { ProductosCreateDto } from "./dto/hijo.create.dto";
import { ProductosUpdateDto } from "./dto/hijo.update.dto";
import { MateriaEntity } from "./hijo.entity";
import { validate } from "class-validator";

@Controller('api/tienda/gestion')
export class ProductoController {
    constructor(
        private readonly _productosService: ProductosService,
        private readonly _loginService: LoginService
    ) {

    }
    @Get(':idPadre')
    async gestionar(
        @Res() res,
        @Req() req,
        @Session() session
    ) {
        console.log(Number(req.params.idPadre));
        try {
            const listaProductos = await this._productosService.
                listaProductos(Number(req.params.idPadre));
            console.log(listaProductos);
            res.render('Administrador/gestionProductos.ejs', {
                usuario: session.username,
                    listaProductos: listaProductos,
                idPadre: Number(req.params.idPadre)
            });
        } catch (e) {
            console.error(e)
        }
    }
    @Get('crear/:idPadre')
    crear(
        @Res() res,
        @Req() req,
        @Query() query,
        @Session() session

    ) {
        //console.log("Ha llegado: ",query);
        const hoy = new Date();

        let fecha;
        //console.log(query.fechaLanzamiento)
        if (query.fechaLanzamiento == null) {
            fecha = hoy
        } else {
            fecha = new Date(query.fechaCreacion)
        }

        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();
        if (mes < 10) {
            mes = "0" + mes;
        };
        if (dia < 10) {
            dia = "0" + dia;
        }
        const fechaLanzamiento = fecha.getFullYear() + "-" + mes + "-" + dia;

        //console.log(fecha);
        //if(this._loginService.validarCookies(req,res)){
        res.render('Administrador/crear-editar.ejs', {
            //usuario:req.signedCookies.usuario,
            usuario: session.username,
            idPadre: req.params.idPadre,
            mensaje: query.mensaje,
            campos: query.campos,
            nombre: query.nombre,
            descripcion: query.descripcion,
            codigo: query.codigo,
            fechaCreacion: fechaLanzamiento,
            activo: query.activo,
            numeroHorasPorSemana: query.numeroHorasPorSemana,
        });
        //}
    }

    @Post('crear/:idPadre')
    async crearPost(
        @Res() res,
        @Body() producto: MateriaEntity,
        @Req() req
    ) {
        console.log("ha llegado el producto:  ",producto);
        producto.TiendaId = req.params.idPadre;
        //producto.tiendaId = Number(producto.tiendaId);
        producto.numeroHorasPorSemana = Number(producto.numeroHorasPorSemana);
        producto.activo = Boolean(producto.activo);
        producto.fechaCreacion = producto.fechaCreacion ? new Date(producto.fechaCreacion) : undefined;

        console.log("transformado:  ",producto);
        
        //console.log(producto);
        let productoValidar = new ProductosCreateDto()

        productoValidar.nombre = producto.nombre;
        productoValidar.fechaCracion = producto.fechaCreacion;
        productoValidar.activo = producto.activo;
        productoValidar.descripcion = producto.descripcion
        productoValidar.codigo = producto.codigo;
        productoValidar.numeroHorasPorSemana = producto.numeroHorasPorSemana;
        productoValidar.TiendaId = producto.TiendaId;
        try {
            const errores = await validate(productoValidar);
            console.log("error: ",errores);
            if (errores.length > 0) {
                const valores = (<ProductosCreateDto>errores[0].target)

                const campos = []
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs = "&nombre=" + valores.nombre + "&fechaLanzamiento=" + valores.fechaCracion + "&aniosGarantia=" + valores.activo + "&precio=" + valores.codigo + "&descripcion=" + valores.descripcion
                res.redirect('/api/tienda/gestion/crear/' + Number(req.params.idPadre) + "?mensaje=Complete los campos obligatorios " + inputs);
            } else {
                const respuestaCrear = await this._productosService.crear(producto);
                res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
            }


        } catch (e) {
            //console.error(e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }
    }

    @Post('eliminar/:idPadre')
    async eliminar(
        @Res() res,
        @Req() req,
        @Body('productoId') productoId: number
    ) {
        //console.log(productoId)

        try {
            const respuestaEliminar = await this._productosService.eliminarPorId(productoId);
            //console.log(respuestaEliminar);
            res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
        } catch (e) {
            console.error(e)
        }

    }
    
    @Post('editar/:idPadre')
    async editar(
        @Res() res,
        @Req() req,
        @Query() query,
        @Body('productoId') productoId: number,
        @Session() session
    ) {
        console.log(productoId)
        try {
            let mensaje = "";
            if(query.mensaje!=""){
                mensaje=query.mensaje;
            }
            //const respuestaEditar=await this._productosService.eliminarPorId(productoId);
            const producto = await this._productosService.buscarXid(productoId)
            console.log("InfoProductoExtraido",producto);
            res.render('Administrador/actualizar.ejs', {
                //usuario:req.signedCookies.usuario,
                producto: producto[0],
                usuario: session.username,
                idPadre: req.params.idPadre,
                mensaje: mensaje,
                //nombre: producto[0].nombre, 
            });
        } catch (e) {
            console.error(e)
        }
    }

    @Post('editarEnvio/:idPadre/:idHijo')
    async editarPost(
        @Res() res,
        @Body() producto: MateriaEntity,
        @Req() req
    ) {
        console.log("ha llegado el producto modificado:  ",producto);
        //producto.productoId = req.params.idHijo;
        producto.TiendaId = req.params.idPadre;
        
        producto.materiaId = Number(producto.materiaId);

        //producto.tiendaId = Number(producto.tiendaId);
        producto.numeroHorasPorSemana = Number(producto.numeroHorasPorSemana);
        producto.activo = Boolean(producto.activo);
        producto.fechaCreacion = producto.fechaCreacion ? new Date(producto.fechaCreacion) : undefined;

        console.log("transformado:  ",producto);
        
        //console.log(producto);
        let productoValidar = new ProductosUpdateDto()

        productoValidar.nombre = producto.nombre;
        productoValidar.codigo = producto.codigo;
        productoValidar.descripcion = producto.descripcion;
        productoValidar.fechaCracion = producto.fechaCreacion
        productoValidar.activo = producto.activo;
        productoValidar.numeroHorasPorSemana = producto.numeroHorasPorSemana;
        productoValidar.TiendaId = producto.TiendaId;
        try {
            const errores = await validate(productoValidar);
            console.log("error: ",errores);
            if (errores.length > 0) {
                const valores = (<ProductosUpdateDto>errores[0].target)

                const campos = []
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs = "&nombre=" + valores.nombre + "&fechaLanzamiento=" + valores.fechaCracion + "&aniosGarantia=" + valores.activo + "&precio=" + valores.numeroHorasPorSemana + "&descripcion=" + valores.descripcion
                res.redirect('/api/tienda/gestion/editar/' + Number(req.params.idPadre) + "?mensaje=Complete los campos obligatorios " + inputs);
            } else {
                const respuestaCrear = await this._productosService.editar(producto);
                res.redirect('/api/tienda/gestion/' + Number(req.params.idPadre));
            }


        } catch (e) {
            //console.error(e);
            res.status(500);
            res.send({ mensaje: 'Error', codigo: 500 });
        }
    }

    @Post('buscar/:idPadre')
    async buscar(
        @Res() res,
        @Req() req,
        @Body() body,
        @Session() session
    ) {

        console.log(body);

        //if(this._loginService.validarCookies(req,res)){


        try {
            const listaProductos = await this._productosService.buscar(body.nombreBusqueda, body.fechaBusqueda);
            res.render('Administrador/gestionProductos.ejs', {
                //usuario:req.signedCookies.usuario,
                usuario: session.username,
                listaProductos: listaProductos,
                idPadre: req.params.idPadre
            });
        } catch (e) {
            console.log(e)
        }
        //}
    }

    @Get('consultaProductos')
    async productos(@Res() res,
        @Req() req
    ) {
        console.log(Number(req.params.idPadre));

        try {

            const listaProductos = await this._productosService.listarTodo();

            console.log(listaProductos);
            res.render({
                listaProductos: listaProductos
            });

        }
        catch (e) {
            console.error(e)
        }
    }

    @Post('consultar-por-id/:pedido')
    //@Render ('api/menu')
    async consultar(
        @Req() req,
        @Body() body,
        @Session() session,
        @Res() res
    ) {
        try {

            const listaProductos = await this._productosService.listaProductos(Number(body.tiendaId));
            console.log(listaProductos);
            res.redirect('/api/menu?pedido=' + req.params.pedido + "&tienda=" + body.tiendaId);
        }
        catch (e) {
            console.error(e)
        }
    }
}