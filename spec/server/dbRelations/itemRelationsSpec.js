var Item = require("../../../server/model/item")

describe("Item relations", function(){
  var relations;

  beforeEach(function(done){
    new Item({id: 1}).fetch({
      withRelated: [
        'seller',
        'transactions',
        'favorites',
      ]
    }).then(function(model){
      relations = model.relations;
      done();
    });
  });

  it("seller in relations object", function(done){
    expect(relations.hasOwnProperty('seller')).toBe(true);
    expect(relations.seller.attributes.first_name).toEqual("Brian");
    done();
  });

  it("transactions in relations object", function(done){
    expect(relations.hasOwnProperty('transactions')).toBe(true);
    expect(relations.transactions.length).toEqual(5);
    done();
  });

  it("favorites in relations object", function(done){
    expect(relations.hasOwnProperty('favorites')).toBe(true);
    expect(relations.favorites.length).toEqual(3);
    done();
  });
});
