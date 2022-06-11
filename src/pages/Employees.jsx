import React, { useEffect, useState, forwardRef } from "react";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import axios from "axios";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
  Select,
  MenuItem
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import axiosCliente from "../Services/axios";

const Employees = () => {
  const useStyles = makeStyles((theme) => ({
    modal: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    iconos: {
      cursor: "pointer",
    },
    inputMaterial: {
      width: "100%",
    },
  }));

  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    Nombre: "",
    Descripcion: "",
    Condicion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //console.log(consolaSeleccionada);
  };

   const [categoria, setCategoria] = React.useState("");
  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
    console.log(categoria)
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const list_category_url = "api/Articules";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosCliente.get(list_category_url).then((res) => {
      setCategories(res?.data);
      //console.log(res.data?.Message);
      console.log(JSON.stringify(res?.data));
    });
  }, []);

  const insertar = async (e) => {
    const response = await axiosCliente
      .post(
        list_category_url,
        JSON.stringify({
          Codigo: consolaSeleccionada.Codigo,
          Nombre: consolaSeleccionada.Nombre,
          Descripcion: consolaSeleccionada.Descripcion,
          Idcategoria: consolaSeleccionada.IDCategoria,
        })
      )
      .then((res) => {
        axiosCliente.get(list_category_url).then((response) => {
          setCategories(response?.data);
          //console.log(res.data?.Message);
          //console.log(JSON.stringify(res?.data));
        });
        abrirCerrarModalInsertar();
        //console.log(res.data?.Message);
        //console.log(JSON.stringify(res?.data));
      });
  };

  const actualizar = async (e) => {
    const response = await axiosCliente
      .put(
        list_category_url,
        JSON.stringify({
          Idarticulo: consolaSeleccionada.Idarticulo,
          Codigo: consolaSeleccionada.Codigo,
          Nombre: consolaSeleccionada.Nombre,
          Descripcion: consolaSeleccionada.Descripcion,
          Idcategoria: consolaSeleccionada.Idcategoria,
        })
      )
      .then((res) => {
        axiosCliente.get(list_category_url).then((response) => {
          setCategories(response?.data);
          //console.log(res.data?.Message);
          //console.log(JSON.stringify(res?.data));
        });
        abrirCerrarModalEditar();
      });
  };

  const desactivar = async (e) => {
    const response = await axiosCliente
      .delete(
        list_category_url + "/" + consolaSeleccionada.Idarticulo,
        JSON.stringify({})
      )
      .then((res) => {
        axiosCliente.get(list_category_url).then((response) => {
          setCategories(response?.data);
          //console.log(res.data?.Message);
          //console.log(JSON.stringify(res?.data));
        });
        abrirCerrarModalEliminar();
      });
  };

    const list_categorias_url = "api/Categories";
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
      axiosCliente.get(list_categorias_url).then((res) => {
        setCategorias(res?.data);
        //console.log(res.data?.Message);
        console.log(JSON.stringify(res?.data));
      });
    }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar nuevo producto</h3>
      <TextField
        name="Codigo"
        className={styles.inputMaterial}
        label="Codigo"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="Nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="Descripcion"
        className={styles.inputMaterial}
        label="Descripcion"
        onChange={handleChange}
      />
      <br />
      <Select
        label="descripcion"
        name="IDCategoria"
        onChange={handleChange}
      >
        {categorias.map((consola) => (
          <MenuItem value={consola.IDCategoria}>{consola.Nombre}</MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => insertar()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar producto</h3>
      <TextField
        name="Codigo"
        className={styles.inputMaterial}
        label="Codigo"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.Codigo}
      />
      <br />
      <TextField
        name="Nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.Nombre}
      />
      <br />
      <TextField
        name="Descripcion"
        className={styles.inputMaterial}
        label="Descripcion"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.Descripcion}
      />
      <br />
      <TextField
        name="Idcategoria"
        className={styles.inputMaterial}
        label="Idcategoria"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.Idcategoria}
      />
      <br />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => actualizar()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar la categoria{" "}
        <b>{consolaSeleccionada && consolaSeleccionada.Nombre}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => desactivar()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Productos"></Header>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((consola) => (
              <TableRow key={consola.Idarticulo}>
                <TableCell>{consola.Codigo}</TableCell>
                <TableCell>{consola.Nombre}</TableCell>
                <TableCell>{consola.Descripcion}</TableCell>
                <TableCell>{consola.Categoria}</TableCell>
                <TableCell>{consola.Condicion}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarConsola(consola, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarConsola(consola, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};
export default Employees;
