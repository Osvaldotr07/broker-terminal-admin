import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getForms, deleteForm, dataToUpdate } from "../actions/index";

import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  OverflowMenu,
  OverflowMenuItem,
  TableToolbar,
  TableToolbarContent,
  Button,
  TableToolbarSearch,
  Loading,
} from "carbon-components-react";
import { Link } from "react-router-dom";

const actionButton = {
  border: "none",
  background: "none",
};

const FormTable = ({
  title,
  forms,
  getForms,
  tk,
  email,
  deleteForm,
  dataToUpdate,
  isDraft,
  rows,
  headers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="form-container">
      {
        !isLoading ? 
        <DataTable
          rows={rows}
          headers={headers}
          render={({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            onInputChange,
          }) => (
            <TableContainer title={title}>
              <TableToolbar>
                <TableToolbarContent>
                  <TableToolbarSearch />
                  {!isDraft ? (
                    <Link to="/form" style={{ textDecoration: "none" }}>
                      <Button
                        // onClick={props.add}
                        size="medium"
                        kind="primary"
                      >
                        Crear nueva forma
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      // onClick={props.add}
                      size="medium"
                      kind="primary"
                      style={{ visibility: "hidden" }}
                    >
                      Crear nueva forma
                    </Button>
                  )}
                </TableToolbarContent>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader>Acciones</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell className="bx--table-column-menu">
                        <OverflowMenu flipped style={actionButton}>
                          <Link to="/edit">
                            <OverflowMenuItem
                              itemText="Verificar"
                              onClick={() => {
                                dataToUpdate(row.id);
                              }}
                            >
                              Editar
                            </OverflowMenuItem>
                          </Link>

                          {/* <OverflowMenuItem
                            itemText="Eliminar"
                            onClick={() => {
                              setIsLoading(true)
                              deleteForm(tk, row.id);
                            }}
                          >
                            Eliminar
                          </OverflowMenuItem> */}
                        </OverflowMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
        : <Loading />
      }
    </div>
  );
};

const mapDispatchToProps = {
  getForms,
  deleteForm,
  dataToUpdate,
};

const mapStateToProps = (state) => {
  return {
    forms: state.forms ? state.forms : [],
    tk: state.data.token,
    email: state.data.user.email,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTable);
