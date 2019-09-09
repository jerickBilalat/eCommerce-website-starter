import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WidgetShopListCard from './widgetShopListCard';
import { syncShopList } from '../../actions/shopListActions';

// class shopListWidget2 extends React.Component {
//   componentDidMount() {
//     const { dispatch } = this.props;
//     dispatch(syncShopList());
//   }

//   render() {
//     const { shopList: shopListItems, doRemoveItem } = this.props;
//     return (
//       <div className="widget">
//         <div className="headline no-margin">
//           <h4>Shopping List</h4>
//         </div>
//         <div id="cart">
//           {shopListItems.length ? (
//             shopListItems.map(item => (
//               <WidgetShopListCard key={item.id} {...item} doRemoveItem={doRemoveItem} />
//             ))
//           ) : (
//             <p>No list items</p>
//           )}
//           <Link to="/shop_list" className="button gray">
//             View List
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     shopList: { ...state.shopList }
//   };
// }

// export default connect(mapStateToProps)(shopListWidget2);

const shopListWidget = ({ shopListItems, doRemoveItem }) => {
  return (
    <div className="widget">
      <div className="headline no-margin">
        <h4>Shopping List</h4>
      </div>
      <div id="cart">
        {shopListItems.length ? (
          shopListItems.map(item => (
            <WidgetShopListCard key={item.id} {...item} doRemoveItem={doRemoveItem} />
          ))
        ) : (
          <p>No list items</p>
        )}
        <Link to="/shop_list" className="button gray">
          View List
        </Link>
      </div>
    </div>
  );
};
export default shopListWidget;
