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

export  function get_sync_server() {
    let result = '';
    $.ajax({
        url: stringFormat("http://{0}:{1}/sync/server",[cfg.server_ip, cfg.server_port]),
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

export  function get_backup_tasks(p_db_env,p_db_type) {
    let result = '';
    $.ajax({
        url: stringFormat("http://{0}:{1}/backup/task",[cfg.server_ip, cfg.server_port]),
        type: "get",
        datatype: "json",
        async:false,
        data:{
            db_env: p_db_env,
            db_type: p_db_type,
        },
        success: function (res) {
            result =  res['Data']
        }
    });
    return result;
}

export  function get_sync_tasks(p_market_id) {
    let result = '';
    $.ajax({
        url: stringFormat("http://{0}:{1}/sync/task",[cfg.server_ip, cfg.server_port]),
        type: "get",
        datatype: "json",
        async:false,
        data:{
            market_id: p_market_id,
        },
        success: function (res) {
            result =  res['Data']
        }
    });
    return result;
}

export function getBeforeDate(n) {
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}


export default {
    formatDate,
    stringFormat,
    get_tree,
    get_dm,
    get_backup_server,
    get_sync_server,
    get_ds_server,
    get_backup_tasks,
    get_sync_tasks,
    getBeforeDate

};
