(function(algolia) {
  'use strict';

  var _ = algolia._;

  var sort_order_base = '' + algolia.config.index_prefix + 'products';

  algolia.sortOrders = [
    { name: sort_order_base, label: '' + algolia.translations.relevance },
  ];

  _.forEach(algolia.config.sort_orders, function(sort_order) {
    if (
      !_.isUndefined(sort_order.asc) &&
      !_.isNull(sort_order.asc) &&
      (sort_order.asc.active === true || sort_order.asc.active === '1')
    ) {
      algolia.sortOrders.push({
        name: sort_order_base + '_' + sort_order.key + '_asc',
        label: sort_order.asc.title,
      });
    }
    if (
      !_.isUndefined(sort_order.desc) &&
      !_.isNull(sort_order.desc) &&
      (sort_order.desc.active === true || sort_order.desc.active === '1')
    ) {
      algolia.sortOrders.push({
        name: sort_order_base + '_' + sort_order.key + '_desc',
        label: sort_order.desc.title,
      });
    }
  });

  // try to fetch sort orders for current collection or fallback to collections default
  var collection_sort_orders =
    algolia.current_collection_id &&
    algolia.config.collection_sort_orders &&
    algolia.config.collection_sort_orders[algolia.current_collection_id]
      ? algolia.config.collection_sort_orders[algolia.current_collection_id]
      : algolia.config.collection_sort_orders &&
        algolia.config.collection_sort_orders.default;

  if (collection_sort_orders) {
    algolia.collectionSortOrders = [
      { name: sort_order_base, label: '' + algolia.translations.relevance },
    ];

    _.forEach(collection_sort_orders, function(sort_order) {
      if (
        !_.isUndefined(sort_order.asc) &&
        !_.isNull(sort_order.asc) &&
        (sort_order.asc.active === true || sort_order.asc.active === '1')
      ) {
        algolia.collectionSortOrders.push({
          name: sort_order_base + '_' + sort_order.key + '_asc',
          label: sort_order.asc.title,
        });
      }
      if (
        !_.isUndefined(sort_order.desc) &&
        !_.isNull(sort_order.desc) &&
        (sort_order.desc.active === true || sort_order.desc.active === '1')
      ) {
        algolia.collectionSortOrders.push({
          name: sort_order_base + '_' + sort_order.key + '_desc',
          label: sort_order.desc.title,
        });
      }
    });
  }
})(window.algoliaShopify);
