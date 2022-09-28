module.exports = {
  async fetchSingle(modelName, val) {
    return await modelName.findOne({
      where: { id: val }
    });
  },

  async validatePhone(modelName, val) {
    return await modelName.findOne({
      where: { phone: val }
    });
  },

  async validateEmail(modelName, val) {
    return await modelName.findOne({
      where: { email: val }
    });
  },

  async multiple(modelName, obj) {
    return await modelName.findAll({ where: obj });
  },

  async transform(name) {
    var fullname = name;
    var splitName = fullname.split(' ');
    var newName = "";

    for (var i = 0; i < splitName.length; i++) {
      newName += ' ' + splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1);
      if (i == 0) {
        newName = newName.trim();
      }
    }

    return newName;
  },

  async currentDate() {
    var d = new Date();

    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();

    var dateStr = date + "-" + month + "-" + year;
    return dateStr;
  },

  async currentYear() {
    var d = new Date(); // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();

    return year;
  },

  async randomStr(numLength) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < numLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  async randomNum(numLength) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < numLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  /**
   * paginate
   * @param {number} page
   * @param {number} pageSize
   */
  paginate(page, pageSize) {
    let offset = page == 1 ? 0 : pageSize * (page - 1);

    let limit = pageSize;

    return { offset: offset, limit: limit };
  },

  /**
   * Pagination converter
   * @param {Array|Object} result
   * @param {number} count
   * @param {number} page
   * @param {number} pageSize
   * @returns Array|Object
   */
  dataToPagination(result, count, page, pageSize) {
    let total_count = count;
    let total_page = Math.ceil(total_count / pageSize);
    if (page <= total_page) {
      let data = {};
      data.meta = {
        current_page: page,
        per_page: pageSize,
        from: 1,
        to: page,
        total: total_count,
        last_page: total_page,
        prev: page <= total_page ? page == 1 ? null : page - 1 : null,
        next: page > total_page ? null : page == total_page ? null : page + 1
      };
      data.data = result;
      return data;
    } else {
      return [];
    }
  },

  distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      // distance between latitudes and longitudes
      var dLat = (lat2 - lat1) * Math.PI / 180.0;
      var dLon = (lon2 - lon1) * Math.PI / 180.0;

      // convert to radians
      lat1 = (lat1) * Math.PI / 180.0;
      lat2 = (lat2) * Math.PI / 180.0;

      // apply formulae
      var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

      var rad = 6371;
      var c = 2 * Math.asin(Math.sqrt(a));
      return rad * c;

    }
  },

  /**
   * Convert to sentence
   * @param {string} name
   */
  async sentenceCase(name) {
    name = name.toLowerCase(); // convert to lowercase

    let sentenceCase = name.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ');
    // Check if hyphen is found
    if (sentenceCase.indexOf('-') > -1) {
      let data = sentenceCase.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('-');
      sentenceCase = data;
    }

    if (sentenceCase.indexOf('. ') > -1) {
      let data = sentenceCase.split('. ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('. ');
      sentenceCase = data;
    }

    return sentenceCase;
  },

  /**
   * Format word
   * @param {string} str
   * @returns {string}
   */
  wordFormatter(str) {
    let word = str.charAt(0).toUpperCase() + str.slice(1);
    // Check if hyphen is found
    if (word.indexOf('-') > -1) {
      let data = word.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('-');
      word = data;
    }
    if (word.indexOf('. ') > -1) {
      let data = word.split('. ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('. ');
      word = data;
    }
    if (word.indexOf('i ') > -1) {
      let data = word.split('i ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('I ');
      word = data;
    }
    if (word.indexOf('i\'') > -1) {
      let data = word.split('i\'').map(item => item.charAt(0) + item.slice(1)).join('I\'');
      word = data;
    }

    return word;
  },

  /**
   * Convert to local time
   * @param {string} time
   * @returns {string}
   */
  toLocalTime(time) {
    var min = time.slice(-3);
    var d = time.split(min);
    var hour = d[0];
    if (parseInt(hour) > 12) {
      return `${(parseInt(hour) - 12).toString().padStart(2, '0')}${min} PM`;
    } else {
      return `${hour.toString().padStart(2, '0')}${min} AM`;
    }
  },

  /**
   * Return future timestamp
   * @param {number} hour
   */
  async timeFlight(hour) {
    var date = new Date();
    var min = date.getMinutes();
    var hr = date.getHours() + parseInt(hour);
    date.setMinutes(min);
    date.setHours(hr);
    return date.getTime();
  },

  /**
   * Generate random number
   * by length
   * @param {number} numLength
   */
  async random(numLength = 10) {
    var result = '';
    var numbers = '0123456789';
    var numbersLength = numbers.length;
    for (var i = 0; i < numLength; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result;
  },

  /**
   * Get the remaining time in human readable format
   * @param {number} timestamp
   * @returns {string}
   */
  timeFlightRemains(timestamp) {
    let countDownToDate = parseInt(timestamp);
    let now = Date.now();
    let distance = countDownToDate - now;

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    if (distance < 1) {
      return false;
    } else {
      if (Math.floor(distance / hour) < 1) {
        return `${Math.floor((distance % (hour)) / (minute))} ${Math.floor((distance % (hour)) / (minute)) < 2 ? 'minute' : 'minutes'} time`;
      } else {
        if (Math.floor((distance % (hour)) / (minute)) < 1) {
          return `${Math.floor((distance % (day)) / (hour))} ${Math.floor((distance % (day)) / (hour)) < 2 ? 'hour' : 'hours'}`;
        } else {
          return `${Math.floor((distance % (day)) / (hour))} ${Math.floor((distance % (day)) / (hour)) < 2 ? 'hour' : 'hours'} ${Math.floor((distance % (hour)) / (minute))} ${Math.floor((distance % (hour)) / (minute)) < 2 ? 'minute' : 'minutes'} time`;
        }
      }
    }
  }
};