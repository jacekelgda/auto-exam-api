const performTest = (url, code) => {
  console.log('Testing: ' + url)
  console.log('Init web driver process')
  var webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until,
      assert = require('assert'),
      SauceLabs = require('saucelabs'),
      username = process.env.SAUCE_USERNAME,
      accessKey = process.env.SAUCE_ACCESS_KEY,
      driver,
      success,
      saucelabs = new SauceLabs({
        username: username,
        password: accessKey
      })

  driver = new webdriver.Builder().
    withCapabilities({
      'browserName': process.env.BROWSER,
      'version': process.env.VERSION,
      'platform': process.env.PLATFORM,
      'username': username,
      'accessKey': accessKey
    }).
    usingServer("http://" + username + ":" + accessKey +
                "@ondemand.saucelabs.com:80/wd/hub").
    build();
    var passed = false
    driver.get(url).then(function() {
      return driver.findElement(By.className('main'));
    }).then(function (el) {
      return el.getText()
    }).then(function(text) {
      try {
        assert.equal(text, 'Code is: ' + code)
        passed = true
      } catch (e) {
        console.log(e)
      }
      return driver.getSession()
    }).then(function (sessionid) {
      driver.sessionID = sessionid.id_;
      saucelabs.updateJob(driver.sessionID, {
        name: url,
        passed: passed
      }, function() {
        console.log('done!')
      })
      return driver.quit()
    })
}

module.exports = {
  performTest,
}
