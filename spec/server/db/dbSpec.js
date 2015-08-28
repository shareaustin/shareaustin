var User = require("../../../server/model/user")
var Item = require("../../../server/model/item")
var Favorite = require("../../../server/model/favorite")
var Transaction = require("../../../server/model/transaction")
var ItemPhoto = require("../../../server/model/itemPhoto")
var Rating = require("../../../server/model/rating")
var Chat = require("../../../server/model/chat")
var Message = require("../../../server/model/message")

describe("Database Suite", function(){
  var user,
      item,
      favorite,
      transaction,
      itemPhoto,
      rating,
      chat,
      message;

  beforeEach(function(done){
    new User({id: 1}).fetch().then(function(model){
      user = model.attributes;
      return new Item({id: 1}).fetch();
    }).then(function(model){
      item = model.attributes;
      return new Favorite({user_id: 1, item_id: 2}).fetch();
    }).then(function(model){
      favorite = model.attributes;
      return new Transaction({item_id: 1, buyer_id:2}).fetch();
    }).then(function(model){
      transaction = model.attributes;
      return new ItemPhoto({id: 1}).fetch();
    }).then(function(model){
      itemPhoto = model.attributes;
      return new Rating({transaction_id: 1, item_id: 1}).fetch();
    }).then(function(model){
      rating = model.attributes;
      return new Chat({id: 1}).fetch();
    }).then(function(model){
      chat = model.attributes;
      return new Message({id: 1}).fetch();
    }).then(function(model){
      message = model.attributes;
      done();
    });
  });

  it("user in database", function(done){
    expect(user.first_name).toEqual("Brian");
    done();
  });


  it("item in database", function(done){
    expect(item.name).toEqual("Intex Challenger Kayak");
    done();
  });

  it("favorite in database", function(done){
    expect(favorite.user_id).toEqual(1);
    expect(favorite.item_id).toEqual(2);
    done();
  });

  it("transaction in database", function(done){
    expect(transaction.item_id).toEqual(1);
    expect(transaction.buyer_id).toEqual(2);
    done();
  });

  it("item_photo in database", function(done){
    expect(itemPhoto.photo_url).toEqual("http://res.cloudinary.com/drw6xrsdi/image/upload/v1439326970/camerazoom-20130515123251956-medium_tglmt8.jpg");
    done();
  });

  it("rating in database", function(done){
    expect(rating.transaction_id).toEqual(1);
    expect(rating.item_id).toEqual(1);
    done();
  });
  
  it("chat in database", function(done){
    expect(chat.item_id).toEqual(1);
    expect(chat.buyer_id).toEqual(2);
    done();
  });

  it("message in database", function(done){
    expect(message.chat_id).toEqual(1);
    expect(message.sender_id).toEqual(2);
    done();
  });
});
