var dateformat = require('dateformat')

module.exports = function (){

    this.dateToString = function (date, format){
        return dateformat(date, format)
    }

    this.stringToDate = function (dateString, format){
        let index_year = format.search('yyyy')
        let year = dateString.slice(index_year, index_year + 4)

        let index_month = format.search('mm')
        let month = dateString.slice(index_month, index_month + 2)

        let index_day = format.search('dd')
        let day = dateString.slice(index_day, index_day + 2)

        return new Date(year, parseInt(month)-1 , day)
    }

    this.subtractDates = function(date1, date2){
        return Math.abs(date2 - date1) / 1000 / 60 / 60 / 24
    }

    return this
}