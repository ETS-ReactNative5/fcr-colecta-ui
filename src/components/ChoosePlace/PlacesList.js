import React from 'react';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table';

class PlacesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 10
    }
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleClick = (event, place) => {
    this.props.onPlaceSelected(place);
  }

  render() {
    const data = this.props.places;
    const {page, rowsPerPage} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dirección</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(place => {
            return (
              <TableRow
                key={place.id}
                hover
                onClick={event => this.handleClick(event, {id: place.id, name: place.name})}
                className={this.props.currentPlace.id === place.id ? 'selected' : ''}
              >
                <TableCell>{place.name}</TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{height: 48 * emptyRows}}>
              <TableCell colSpan={2}/>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={2}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
              rowsPerPageOptions={[10]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

export default PlacesList;