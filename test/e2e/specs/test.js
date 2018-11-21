// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'login test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.elementPresent('#blogin')
      .assert.elementPresent('#babout')
      .click('#blogin')

      .waitForElementVisible('#login', 5000)
      .assert.elementPresent('input[type=text]')
      .assert.elementPresent('input[type=password]')
      .setValue('input[type=text]', 'admin')
      .setValue('input[type=password]', 'admin')
      .waitForElementVisible('button[name=loginbutton]', 1000)
      .click('button[name=loginbutton]')

      .waitForElementVisible('#account', 5000)
      .assert.elementPresent('#cont')
      .assert.elementPresent('.sidenav')
      .assert.elementPresent('#bmyaccount')
      .assert.elementPresent('#bfleet')
      .assert.elementPresent('#brankings')
      .assert.elementPresent('#blogout')

  },

  'navigating to fleet overview': function (browser) {

    browser
      .assert.elementPresent('#bfleet')
      .click('#bfleet')
      .waitForElementVisible('#fleet-overview', 5000)
      .assert.elementPresent('#cont')
      .assert.elementPresent('.sidenav')
      .assert.elementPresent('#bmyaccount')
      .assert.elementPresent('#bfleet')
      .assert.elementPresent('#brankings')
      .assert.elementPresent('#blogout')
      
  },

  "testing route search given destination 'mon' ": function (browser) {
    browser  
      .assert.elementPresent('#searchField')
      .assert.elementPresent('input[type=text]')
      .assert.elementPresent('button[name=searchButton]')
      .assert.elementPresent('#filterselect')
      .assert.elementPresent('#filterselect option[value="destination"]')

      //testing if gives error when no filter selected
      .click('button[name=searchButton]')
      .waitForElementVisible('#errorMessage', 5000)
      

      //testing if gives error when no search input
      .click('#filterselect option[value="destination"]')
      .click('button[name=searchButton]')
      .waitForElementVisible('#errorMessage', 5000)

      //testing search function with destination 'mon'
      .click('#filterselect option[value="destination"]')
      .setValue('input[type=text]','mon')
      .click('button[name=searchButton]')
      .expect.element('#errorMessage').to.not.be.present;
      
    browser
      .click('#bmyaccount')
      .waitForElementVisible('#account', 5000)
  },

  'navigating to rankings': function (browser) {

    browser
      .assert.elementPresent('#brankings')
      .click('#brankings')
      .waitForElementVisible('#rankings', 5000)
      .assert.elementPresent('.sidenav')
      .assert.elementPresent('#bmyaccount')
      .assert.elementPresent('#bfleet')
      .assert.elementPresent('#brankings')
      .assert.elementPresent('#blogout')
      
      .click('#bmyaccount')
      .waitForElementVisible('#account', 5000)

  },

  'logging out': function (browser) {

    browser
      .assert.elementPresent('#blogout')
      .click('#blogout')

      .waitForElementVisible('#login', 5000)
      
      
  },
  
  'going back to home': function (browser) {

    browser
      .assert.elementPresent('#back')
      .click('#back')

      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.elementPresent('#blogin')
      .assert.elementPresent('#babout')
      
  },

  'navigating to about us page': function (browser) {

    browser
      .assert.elementPresent('#babout')
      .click('#babout')

      .waitForElementVisible('#about', 5000)

      .assert.elementPresent('#back')
      .click('#back')

      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.elementPresent('#blogin')
      .assert.elementPresent('#babout')

      .end()
  },
  
}
