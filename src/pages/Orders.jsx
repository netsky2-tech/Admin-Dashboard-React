import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnChooser, Toolbar, Group } from '@syncfusion/ej2-react-grids';
import { L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
//import * as numberingSystems from './numberingSystems.json';
//import * as numbers from './numbers.json';
//import * as timeZoneNames from './timeZoneNames.json';
//import * as cagregorian from './ca-gregorian.json';
//import * as currencies from './currencies.json';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import axios from '../Services/axios';

const Orders = () => {
  L10n.load({
    'es-ES': {
      'grid': {
        'EmptyDataSourceError': 'No se encontraron datos.',
        'EmptyRecord': 'No se muestran registros',
        'GroupDropArea': 'Arrastre una cabecera de columna aqui para que el grupo cambie de columna',
        'Item': 'Item',
        'Items': 'Items',
        'UnGroup': 'Haga clic para desagrupar',
        'Add': 'Agregar',
        'Edit': 'Editar',
        'Cancel': 'Cancelar',
        'Update': 'Actualizar',
        'Delete': 'Eliminar',
        'Columns': 'Columnas',
        'Search': 'Buscar',
        'autoFit': 'Auto ajustar esta columna',
        'autoFitAll': 'Auto ajustar todas las columnas',
        'Group': 'Agrepar por esta columna',
        'EditOperationAlert': 'No se ha seleccionado ningún registro para editar',
        'DeleteOperationAlert': 'No se ha seleccionado ningún registro para eliminar',
        'SaveButton': 'Guardar',
        'OkButton': 'Ok',
        'CancelButton': 'Cancelar',
        'EditFormTitle': 'Detalles de ',
        'AddFormTitle': 'Agregar nuevo registro',
        'Export': 'Exportar'
      },
      'pager': {
        'currentPageInfo': '{0} de {1} Páginas',
        'firstPageTooltip': 'Ir a la primera página',
        'lastPageTooltip': 'Ir a la última página',
        'nextPageTooltip': 'Siguiente página',
        'nextPagerTooltip': 'A la siguiente página',
        'previousPageTooltip': 'Página anterior',
        'previousPagerTooltip': 'A la siguiente página',
        'totalItemsInfo': '({0} Total de registros)'
      }
    }
  });

  const list_category_url = 'api/Categories';
  const [categories, setCategories ] = useState(null);
  useEffect(() =>{
    const response = axios.get(list_category_url
     ).then((res) => {
      setCategories(res.data)
        console.log(res.data?.Message);
        console.log(JSON.stringify(res?.data));
      });
  },[])

  setCulture('es-ES');
  setCurrencyCode('NIO');

  const toolbarOptions = ['Add', 'Edit', 'Delete', 'ColumnChooser', 'Search'];
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, allowGrouping: true, mode: 'Dialog' };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Catalogo" title="Categorias" />
      <GridComponent
        id="gridcomp"
        dataSource={categories}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport

        editSettings={editing}
        toolbar={toolbarOptions}
        showColumnChooser
        locale='es-ES'
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ColumnDirective field='IDCategoria' headerText='ID Categoria' width='120' textAlign="Left"/>
          <ColumnDirective field='Nombre' headerText='Nombre' width='120' textAlign="Left"/>
          <ColumnDirective field='Descripcion' headerText='Descripción de categoria' width='120' textAlign="Left"/>
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, ColumnChooser, Group]} />
      </GridComponent>
    </div>
  );
};
export default Orders;