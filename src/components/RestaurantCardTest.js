
class RestaurantCardTest extends React.Component {

    static propTypes = {
        restaurantDetails: PropTypes.object,
        restaurantReviews: PropTypes.func,
        stateOpenDetail: PropTypes.func
    }

    onClickClose = () => {
      const {index, removeItem} = this.props;
      removeItem(index);
    };
  
    onClickDone = () => {
      const {index, markTodoDone} = this.props;
      markTodoDone(index);
    };
  
    render() {
      const {item} = this.props;
      const todoClass = item.done ? "done" : "undone";
      return (
        <tr data-testid={`todoItem${item.index}`}>
          <td className={todoClass}>
            <span data-testid="markAsCompleted" className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}/>
              {item.value}
            <span data-testid="markAsDeleted"className="glyphicon glyphicon-remove-sign close" aria-hidden="true" onClick={this.onClickClose}/>
          </td>
        </tr>
      );
    }
  }
