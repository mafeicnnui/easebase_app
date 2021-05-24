import $ from 'jquery'
import config from './config'

let cfg = config();

export function stringFormat (formatted, args) {
    for (let i = 0; i < args.length; i++) {
        let regexp = new RegExp('\\{' + i + '\\}', 'gi')
        formatted = formatted.replace(regexp, args[i])
    }
    return formatted
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
            );
        }
    }
    return fmt;
}

export  function get_tree() {
    let result = '' ;
    $.ajax({
        url: stringFormat("http://{0}:{1}/tree2",[cfg.server_ip, cfg.server_port]),
        type: "post",
        datatype: "json",
        async:false,
        data:{},
        success: function (res) {
          result =  res['Data']
        }
    });
    return result;
}

export  function get_dm(p_dm) {
    let result = '';
    $.ajax({
        //url: "http://10.16.47.114:9000/dm",
        url: stringFormat("http://{0}:{1}/dm",[cfg.server_ip, cfg.server_port]),
        type: "post",
        datatype: "json",
        async:false,
        data:{
            dm: p_dm,
        },
        success: function (res) {
            result =  res['Data']
        }
    });
    return result;
}

export  function get_backup_server() {
    let result = '';
    $.ajax({
        url: stringFormat("http://{0}:{1}/backup/server",[cfg.server_ip, cfg.server_port]),
        type: "get",
        datatype: "json",
        async:false,
        success: function (res) {
            result =  res['Data']
        }
    });
    return result;
}

export  function get_ds_server() {
    let result = '';
    $.ajax({
        url: stringFormat("http://{0}:{1}/ds/server",[cfg.server_ip, cfg.server_port]),
        type: "get",
        datatype: "json",
        async:false,
        success: function (res) {
            result =  res['Data']
        }
    });
    return result;
}

export default {
    formatDate,
    stringFormat,
    get_tree,
    get_dm,
    get_backup_server,
    get_ds_server
};
