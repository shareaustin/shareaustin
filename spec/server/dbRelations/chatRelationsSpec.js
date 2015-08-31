var Chat = require("../../../server/model/chat")

describe("Chat relations", function(){
  var relations;

  beforeEach(function(done){
    new Chat({id: 1}).fetch({
      withRelated: [
        'item',
        'messages',
        'buyer',
        'seller',
      ]
    }).then(function(model){
      relations = model.relations;
      done();
    });
  });

  it("item in relations object", function(done){
    expect(relations.hasOwnProperty('item')).toBe(true);
    expect(relations.item.attributes.id).toEqual(1);
    done();
  });

  it("messages in relations object", function(done){
    expect(relations.hasOwnProperty('messages')).toBe(true);
    expect(relations.messages.length).toEqual(3);
    done();
  });

  it("buyer in relations object", function(done){
    expect(relations.hasOwnProperty('buyer')).toBe(true);
    expect(relations.buyer.attributes.first_name).toEqual("Duevyn");
    done();
  });

  it("seller in relations object", function(done){
    expect(relations.hasOwnProperty('seller')).toBe(true);
    expect(relations.seller.attributes.first_name).toEqual("Brian");
    done();
  });
});
