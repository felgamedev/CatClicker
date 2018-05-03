var model = {
  currentCat: undefined,
  adminPanelHidden: true,
  cats: [
    {
      name: "Lorna",
      imgPath: "img/cat1.jpg",
      clickCounter: 0
    },
    {
      name: "Taco",
      imgPath: "img/cat2.jpg",
      clickCounter: 0
    },
    {
      name: "Fergus",
      imgPath: "img/cat3.jpg",
      clickCounter: 0
    },
    {
      name: "Spud",
      imgPath: "img/cat4.jpg",
      clickCounter: 0
    },
    {
      name: "Spaggle",
      imgPath: "img/cat5.jpg",
      clickCounter: 0
    }
  ]
};

var listView = {
  listView: [],
  init: function() {
    // Get the HTMl container
    let catList = document.querySelector(".cat-list");

    catList.addEventListener("click", function(event) {
      let allListItems = document.querySelectorAll(".cat-li");
      for (let i = 0; i < allListItems.length; i++) {
        if (event.target == allListItems[i]) octopus.loadCat(i);
      }
    });

    this.render();
  },

  render: function() {
    let allCats = octopus.getAllCats();
    let innerHTML = "";

    allCats.forEach(function(cat) {
      innerHTML += `<li class='cat-li'>${cat.name}</li>`;
    });

    document.querySelector(".cat-list").innerHTML = innerHTML;
  }
};

var panelView = {
  init: function() {
    this.catName = document.querySelector("#cat-name");
    this.catImg = document.querySelector(".cat-img");
    this.catCounter = document.querySelector("#cat-counter");

    document
      .querySelector(".cat-panel")
      .addEventListener("click", function(event) {
        if (event.target.nodeName == "IMG") {
          octopus.incrementCounter();
        }
      });

    this.render();
  },

  render: function() {
    let cat = octopus.getCurrentCat();
    this.catName.textContent = cat.name;
    this.catImg.src = cat.imgPath;
    this.catCounter.textContent = cat.clickCounter;
  }
};

var adminPanelView = {
  init: function() {
    this.toggle = document.querySelector("#admin-button");
    this.form = document.querySelector("#admin-form");
    this.nameField = document.querySelector("#admin-name");
    this.urlField = document.querySelector("#admin-url");
    this.counterField = document.querySelector("#admin-counter");
    this.cancel = document.querySelector("#admin-cancel-button");
    this.submit = document.querySelector("#admin-submit-button");

    this.form.style.display = (octopus.getAdminHidden()) ? "none" : "block";

    this.toggle.addEventListener("click", (function(form) {
      return function() {
        let hideAdmin = octopus.toggleAdminVisibility();
      };
    })(this.form));
  },

  render: function(){
    this.form.style.display = (octopus.getAdminHidden()) ? "none" : "block";
  }
};

var octopus = {
  init: function() {
    model.currentCat = model.cats[0];

    listView.init();
    panelView.init();
    adminPanelView.init();
  },

  getAllCats: function() {
    return model.cats;
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  loadCat: function(index) {
    model.currentCat = model.cats[index];
    panelView.render();
  },

  incrementCounter: function() {
    model.currentCat.clickCounter++;
    panelView.render();
  },

  toggleAdminVisibility: function() {
    model.adminPanelHidden = !model.adminPanelHidden;
    adminPanelView.render();
  },

  getAdminHidden: function() {
    return model.adminPanelHidden;
  }
};

octopus.init();
