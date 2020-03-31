(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
            root.Backbone = factory(root, exports, _, $);
        });
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore');
        factory(root, exports, _);
    } else {
        root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
    }
}(this, function(root, Backbone, _, $) {
    var previousBackbone = root.Backbone;
    var array = [];
    var push = array.push;
    var slice = array.slice;
    var splice = array.splice;
    Backbone.VERSION = '1.1.2';
    Backbone.$ = $;
    Backbone.noConflict = function() {
        root.Backbone = previousBackbone;
        return this;
    };
    Backbone.emulateHTTP = false;
    Backbone.emulateJSON = false;
    var Events = Backbone.Events = {
        on: function(name, callback, context) {
            if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({
                callback: callback,
                context: context,
                ctx: context || this
            });
            return this;
        },
        once: function(name, callback, context) {
            if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
            var self = this;
            var once = _.once(function() {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
        },
        off: function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
            if (!name && !callback && !context) {
                this._events = void 0;
                return this;
            }
            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length) delete this._events[name];
                }
            }
            return this;
        },
        trigger: function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, arguments);
            return this;
        },
        stopListening: function(obj, name, callback) {
            var listeningTo = this._listeningTo;
            if (!listeningTo) return this;
            var remove = !name && !callback;
            if (!callback && typeof name === 'object') callback = this;
            if (obj)(listeningTo = {})[obj._listenId] = obj;
            for (var id in listeningTo) {
                obj = listeningTo[id];
                obj.off(name, callback, this);
                if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
            }
            return this;
        }
    };
    var eventSplitter = /\s+/;
    var eventsApi = function(obj, action, name, rest) {
        if (!name) return true;
        if (typeof name === 'object') {
            for (var key in name) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
        }
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
        }
        return true;
    };
    var triggerEvents = function(events, args) {
        var ev, i = -1,
            l = events.length,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2];
        switch (args.length) {
            case 0:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx);
                return;
            case 1:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1);
                return;
            case 2:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;
            case 3:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;
            default:
                while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
                return;
        }
    };
    var listenMethods = {
        listenTo: 'on',
        listenToOnce: 'once'
    };
    _.each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeningTo = this._listeningTo || (this._listeningTo = {});
            var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
            listeningTo[id] = obj;
            if (!callback && typeof name === 'object') callback = this;
            obj[implementation](name, callback, this);
            return this;
        };
    });
    Events.bind = Events.on;
    Events.unbind = Events.off;
    _.extend(Backbone, Events);
    var Model = Backbone.Model = function(attributes, options) {
        var attrs = attributes || {};
        options || (options = {});
        this.cid = _.uniqueId('c');
        this.attributes = {};
        if (options.collection) this.collection = options.collection;
        if (options.parse) attrs = this.parse(attrs, options) || {};
        attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };
    _.extend(Model.prototype, Events, {
        changed: null,
        validationError: null,
        idAttribute: 'id',
        initialize: function() {},
        toJSON: function(options) {
            return _.clone(this.attributes);
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        get: function(attr) {
            return this.attributes[attr];
        },
        escape: function(attr) {
            return _.escape(this.get(attr));
        },
        has: function(attr) {
            return this.get(attr) != null;
        },
        set: function(key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (key == null) return this;
            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }
            options || (options = {});
            if (!this._validate(attrs, options)) return false;
            unset = options.unset;
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;
            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {};
            }
            current = this.attributes, prev = this._previousAttributes;
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
            for (attr in attrs) {
                val = attrs[attr];
                if (!_.isEqual(current[attr], val)) changes.push(attr);
                if (!_.isEqual(prev[attr], val)) {
                    this.changed[attr] = val;
                } else {
                    delete this.changed[attr];
                }
                unset ? delete current[attr] : current[attr] = val;
            }
            if (!silent) {
                if (changes.length) this._pending = options;
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:' + changes[i], this, current[changes[i]], options);
                }
            }
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    options = this._pending;
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },
        unset: function(attr, options) {
            return this.set(attr, void 0, _.extend({}, options, {
                unset: true
            }));
        },
        clear: function(options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, {
                unset: true
            }));
        },
        hasChanged: function(attr) {
            if (attr == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, attr);
        },
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
            var val, changed = false;
            var old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) {
                if (_.isEqual(old[attr], (val = diff[attr]))) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        },
        previous: function(attr) {
            if (attr == null || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var model = this;
            var success = options.success;
            options.success = function(resp) {
                if (!model.set(model.parse(resp, options), options)) return false;
                if (success) success(model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            wrapError(this, options);
            return this.sync('read', this, options);
        },
        save: function(key, val, options) {
            var attrs, method, xhr, attributes = this.attributes;
            if (key == null || typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }
            options = _.extend({
                validate: true
            }, options);
            if (attrs && !options.wait) {
                if (!this.set(attrs, options)) return false;
            } else {
                if (!this._validate(attrs, options)) return false;
            }
            if (attrs && options.wait) {
                this.attributes = _.extend({}, attributes, attrs);
            }
            if (options.parse === void 0) options.parse = true;
            var model = this;
            var success = options.success;
            options.success = function(resp) {
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                    return false;
                }
                if (success) success(model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            wrapError(this, options);
            method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
            if (method === 'patch') options.attrs = attrs;
            xhr = this.sync(method, this, options);
            if (attrs && options.wait) this.attributes = attributes;
            return xhr;
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            var destroy = function() {
                model.trigger('destroy', model, model.collection, options);
            };
            options.success = function(resp) {
                if (options.wait || model.isNew()) destroy();
                if (success) success(model, resp, options);
                if (!model.isNew()) model.trigger('sync', model, resp, options);
            };
            if (this.isNew()) {
                options.success();
                return false;
            }
            wrapError(this, options);
            var xhr = this.sync('delete', this, options);
            if (!options.wait) destroy();
            return xhr;
        },
        url: function() {
            var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
            if (this.isNew()) return base;
            return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
        },
        parse: function(resp, options) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return !this.has(this.idAttribute);
        },
        isValid: function(options) {
            return this._validate({}, _.extend(options || {}, {
                validate: true
            }));
        },
        _validate: function(attrs, options) {
            if (!options.validate || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            if (!error) return true;
            this.trigger('invalid', this, error, _.extend(options, {
                validationError: error
            }));
            return false;
        }
    });
    var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];
    _.each(modelMethods, function(method) {
        Model.prototype[method] = function() {
            var args = slice.call(arguments);
            args.unshift(this.attributes);
            return _[method].apply(_, args);
        };
    });
    var Collection = Backbone.Collection = function(models, options) {
        options || (options = {});
        if (options.model) this.model = options.model;
        if (options.comparator !== void 0) this.comparator = options.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, _.extend({
            silent: true
        }, options));
    };
    var setOptions = {
        add: true,
        remove: true,
        merge: true
    };
    var addOptions = {
        add: true,
        remove: false
    };
    _.extend(Collection.prototype, Events, {
        model: Model,
        initialize: function() {},
        toJSON: function(options) {
            return this.map(function(model) {
                return model.toJSON(options);
            });
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        add: function(models, options) {
            return this.set(models, _.extend({
                merge: false
            }, options, addOptions));
        },
        remove: function(models, options) {
            var singular = !_.isArray(models);
            models = singular ? [models] : _.clone(models);
            options || (options = {});
            var i, l, index, model;
            for (i = 0, l = models.length; i < l; i++) {
                model = models[i] = this.get(models[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byId[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!options.silent) {
                    options.index = index;
                    model.trigger('remove', model, this, options);
                }
                this._removeReference(model, options);
            }
            return singular ? models[0] : models;
        },
        set: function(models, options) {
            options = _.defaults({}, options, setOptions);
            if (options.parse) models = this.parse(models, options);
            var singular = !_.isArray(models);
            models = singular ? (models ? [models] : []) : _.clone(models);
            var i, l, id, model, attrs, existing, sort;
            var at = options.at;
            var targetModel = this.model;
            var sortable = this.comparator && (at == null) && options.sort !== false;
            var sortAttr = _.isString(this.comparator) ? this.comparator : null;
            var toAdd = [],
                toRemove = [],
                modelMap = {};
            var add = options.add,
                merge = options.merge,
                remove = options.remove;
            var order = !sortable && add && remove ? [] : false;
            for (i = 0, l = models.length; i < l; i++) {
                attrs = models[i] || {};
                if (attrs instanceof Model) {
                    id = model = attrs;
                } else {
                    id = attrs[targetModel.prototype.idAttribute || 'id'];
                }
                if (existing = this.get(id)) {
                    if (remove) modelMap[existing.cid] = true;
                    if (merge) {
                        attrs = attrs === model ? model.attributes : attrs;
                        if (options.parse) attrs = existing.parse(attrs, options);
                        existing.set(attrs, options);
                        if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
                    }
                    models[i] = existing;
                } else if (add) {
                    model = models[i] = this._prepareModel(attrs, options);
                    if (!model) continue;
                    toAdd.push(model);
                    this._addReference(model, options);
                }
                model = existing || model;
                if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
                modelMap[model.id] = true;
            }
            if (remove) {
                for (i = 0, l = this.length; i < l; ++i) {
                    if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
                }
                if (toRemove.length) this.remove(toRemove, options);
            }
            if (toAdd.length || (order && order.length)) {
                if (sortable) sort = true;
                this.length += toAdd.length;
                if (at != null) {
                    for (i = 0, l = toAdd.length; i < l; i++) {
                        this.models.splice(at + i, 0, toAdd[i]);
                    }
                } else {
                    if (order) this.models.length = 0;
                    var orderedModels = order || toAdd;
                    for (i = 0, l = orderedModels.length; i < l; i++) {
                        this.models.push(orderedModels[i]);
                    }
                }
            }
            if (sort) this.sort({
                silent: true
            });
            if (!options.silent) {
                for (i = 0, l = toAdd.length; i < l; i++) {
                    (model = toAdd[i]).trigger('add', model, this, options);
                }
                if (sort || (order && order.length)) this.trigger('sort', this, options);
            }
            return singular ? models[0] : models;
        },
        reset: function(models, options) {
            options || (options = {});
            for (var i = 0, l = this.models.length; i < l; i++) {
                this._removeReference(this.models[i], options);
            }
            options.previousModels = this.models;
            this._reset();
            models = this.add(models, _.extend({
                silent: true
            }, options));
            if (!options.silent) this.trigger('reset', this, options);
            return models;
        },
        push: function(model, options) {
            return this.add(model, _.extend({
                at: this.length
            }, options));
        },
        pop: function(options) {
            var model = this.at(this.length - 1);
            this.remove(model, options);
            return model;
        },
        unshift: function(model, options) {
            return this.add(model, _.extend({
                at: 0
            }, options));
        },
        shift: function(options) {
            var model = this.at(0);
            this.remove(model, options);
            return model;
        },
        slice: function() {
            return slice.apply(this.models, arguments);
        },
        get: function(obj) {
            if (obj == null) return void 0;
            return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
        },
        at: function(index) {
            return this.models[index];
        },
        where: function(attrs, first) {
            if (_.isEmpty(attrs)) return first ? void 0 : [];
            return this[first ? 'find' : 'filter'](function(model) {
                for (var key in attrs) {
                    if (attrs[key] !== model.get(key)) return false;
                }
                return true;
            });
        },
        findWhere: function(attrs) {
            return this.where(attrs, true);
        },
        sort: function(options) {
            if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
            options || (options = {});
            if (_.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this);
            } else {
                this.models.sort(_.bind(this.comparator, this));
            }
            if (!options.silent) this.trigger('sort', this, options);
            return this;
        },
        pluck: function(attr) {
            return _.invoke(this.models, 'get', attr);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var success = options.success;
            var collection = this;
            options.success = function(resp) {
                var method = options.reset ? 'reset' : 'set';
                collection[method](resp, options);
                if (success) success(collection, resp, options);
                collection.trigger('sync', collection, resp, options);
            };
            wrapError(this, options);
            return this.sync('read', this, options);
        },
        create: function(model, options) {
            options = options ? _.clone(options) : {};
            if (!(model = this._prepareModel(model, options))) return false;
            if (!options.wait) this.add(model, options);
            var collection = this;
            var success = options.success;
            options.success = function(model, resp) {
                if (options.wait) collection.add(model, options);
                if (success) success(model, resp, options);
            };
            model.save(null, options);
            return model;
        },
        parse: function(resp, options) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.models);
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
        },
        _prepareModel: function(attrs, options) {
            if (attrs instanceof Model) return attrs;
            options = options ? _.clone(options) : {};
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model.validationError) return model;
            this.trigger('invalid', this, model.validationError, options);
            return false;
        },
        _addReference: function(model, options) {
            this._byId[model.cid] = model;
            if (model.id != null) this._byId[model.id] = model;
            if (!model.collection) model.collection = this;
            model.on('all', this._onModelEvent, this);
        },
        _removeReference: function(model, options) {
            if (this === model.collection) delete model.collection;
            model.off('all', this._onModelEvent, this);
        },
        _onModelEvent: function(event, model, collection, options) {
            if ((event === 'add' || event === 'remove') && collection !== this) return;
            if (event === 'destroy') this.remove(model, options);
            if (model && event === 'change:' + model.idAttribute) {
                delete this._byId[model.previous(model.idAttribute)];
                if (model.id != null) this._byId[model.id] = model;
            }
            this.trigger.apply(this, arguments);
        }
    });
    var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl', 'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest', 'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle', 'lastIndexOf', 'isEmpty', 'chain', 'sample'];
    _.each(methods, function(method) {
        Collection.prototype[method] = function() {
            var args = slice.call(arguments);
            args.unshift(this.models);
            return _[method].apply(_, args);
        };
    });
    var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];
    _.each(attributeMethods, function(method) {
        Collection.prototype[method] = function(value, context) {
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _[method](this.models, iterator, context);
        };
    });
    var View = Backbone.View = function(options) {
        this.cid = _.uniqueId('view');
        options || (options = {});
        _.extend(this, _.pick(options, viewOptions));
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
    _.extend(View.prototype, Events, {
        tagName: 'div',
        $: function(selector) {
            return this.$el.find(selector);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this;
        },
        setElement: function(element, delegate) {
            if (this.$el) this.undelegateEvents();
            this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
            this.el = this.$el[0];
            if (delegate !== false) this.delegateEvents();
            return this;
        },
        delegateEvents: function(events) {
            if (!(events || (events = _.result(this, 'events')))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;
                var match = key.match(delegateEventSplitter);
                var eventName = match[1],
                    selector = match[2];
                method = _.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }
            return this;
        },
        undelegateEvents: function() {
            this.$el.off('.delegateEvents' + this.cid);
            return this;
        },
        _ensureElement: function() {
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
                this.setElement($el, false);
            } else {
                this.setElement(_.result(this, 'el'), false);
            }
        }
    });
    Backbone.sync = function(method, model, options) {
        var type = methodMap[method];
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var params = {
            type: type,
            dataType: 'json'
        };
        if (!options.url) {
            params.url = _.result(model, 'url') || urlError();
        }
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }
        if (options.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {
                model: params.data
            } : {};
        }
        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
            params.type = 'POST';
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }
        if (params.type !== 'GET' && !options.emulateJSON) {
            params.processData = false;
        }
        if (params.type === 'PATCH' && noXhrPatch) {
            params.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            };
        }
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
    };
    var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);
    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'patch': 'PATCH',
        'delete': 'DELETE',
        'read': 'GET'
    };
    Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };
    var Router = Backbone.Router = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };
    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(Router.prototype, Events, {
        initialize: function() {},
        route: function(route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                router.execute(callback, args);
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                Backbone.history.trigger('route', router, name, args);
            });
            return this;
        },
        execute: function(callback, args) {
            if (callback) callback.apply(this, args);
        },
        navigate: function(fragment, options) {
            Backbone.history.navigate(fragment, options);
            return this;
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            this.routes = _.result(this, 'routes');
            var route, routes = _.keys(this.routes);
            while ((route = routes.pop()) != null) {
                this.route(route, this.routes[route]);
            }
        },
        _routeToRegExp: function(route) {
            route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
                return optional ? match : '([^/?]+)';
            }).replace(splatParam, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
        },
        _extractParameters: function(route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function(param, i) {
                if (i === params.length - 1) return param || null;
                return param ? decodeURIComponent(param) : null;
            });
        }
    });
    var History = Backbone.History = function() {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');
        if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
        }
    };
    var routeStripper = /^[#\/]|\s+$/g;
    var rootStripper = /^\/+|\/+$/g;
    var isExplorer = /msie [\w.]+/;
    var trailingSlash = /\/$/;
    var pathStripper = /#.*$/;
    History.started = false;
    _.extend(History.prototype, Events, {
        interval: 50,
        atRoot: function() {
            return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
        },
        getHash: function(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },
        getFragment: function(fragment, forcePushState) {
            if (fragment == null) {
                if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = decodeURI(this.location.pathname + this.location.search);
                    var root = this.root.replace(trailingSlash, '');
                    if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
                } else {
                    fragment = this.getHash();
                }
            }
            return fragment.replace(routeStripper, '');
        },
        start: function(options) {
            if (History.started) throw new Error("Backbone.history has already been started");
            History.started = true;
            this.options = _.extend({
                root: '/'
            }, this.options, options);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var fragment = this.getFragment();
            var docMode = document.documentMode;
            var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
            this.root = ('/' + this.root + '/').replace(rootStripper, '/');
            if (oldIE && this._wantsHashChange) {
                var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
                this.iframe = frame.hide().appendTo('body')[0].contentWindow;
                this.navigate(fragment);
            }
            if (this._hasPushState) {
                Backbone.$(window).on('popstate', this.checkUrl);
            } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
                Backbone.$(window).on('hashchange', this.checkUrl);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }
            this.fragment = fragment;
            var loc = this.location;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    this.fragment = this.getFragment(null, true);
                    this.location.replace(this.root + '#' + this.fragment);
                    return true;
                } else if (this._hasPushState && this.atRoot() && loc.hash) {
                    this.fragment = this.getHash().replace(routeStripper, '');
                    this.history.replaceState({}, document.title, this.root + this.fragment);
                }
            }
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function() {
            Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
            if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
            History.started = false;
        },
        route: function(route, callback) {
            this.handlers.unshift({
                route: route,
                callback: callback
            });
        },
        checkUrl: function(e) {
            var current = this.getFragment();
            if (current === this.fragment && this.iframe) {
                current = this.getFragment(this.getHash(this.iframe));
            }
            if (current === this.fragment) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl();
        },
        loadUrl: function(fragment) {
            fragment = this.fragment = this.getFragment(fragment);
            return _.any(this.handlers, function(handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
        },
        navigate: function(fragment, options) {
            if (!History.started) return false;
            if (!options || options === true) options = {
                trigger: !!options
            };
            var url = this.root + (fragment = this.getFragment(fragment || ''));
            fragment = fragment.replace(pathStripper, '');
            if (this.fragment === fragment) return;
            this.fragment = fragment;
            if (fragment === '' && url !== '/') url = url.slice(0, -1);
            if (this._hasPushState) {
                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, fragment, options.replace);
                if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
                    if (!options.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, fragment, options.replace);
                }
            } else {
                return this.location.assign(url);
            }
            if (options.trigger) return this.loadUrl(fragment);
        },
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, '');
                location.replace(href + '#' + fragment);
            } else {
                location.hash = '#' + fragment;
            }
        }
    });
    Backbone.history = new History;
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }
        _.extend(child, parent, staticProps);
        var Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        if (protoProps) _.extend(child.prototype, protoProps);
        child.__super__ = parent.prototype;
        return child;
    };
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };
    var wrapError = function(model, options) {
        var error = options.error;
        options.error = function(resp) {
            if (error) error(model, resp, options);
            model.trigger('error', model, resp, options);
        };
    };
    return Backbone;
}));
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
var makeAttributeFn = function(scaleType) {
    var currentValue = 0;
    var scroll = 0;
    var clamp = true;
    var abstractDomain = [0, 0.3, 1];
    var inputRange = [0, 100];
    var inputScale = d3.scale.linear().domain([0, 1]).range(inputRange);
    var domain = [0, 30, 100];
    var abstractRange = [0, 1, 1];
    var outputRange = [0, 1];
    var outputScale = d3.scale.linear().domain([0, 1]).range(outputRange);
    var range = [0, 1, 1];
    var interpolator;
    var handleResize = function() {};
    var attribute = function() {
        return currentValue;
    }
    attribute._updateInterpolator = function() {
        domain = _.map(abstractDomain, function(d) {
            return inputScale(d);
        });
        range = _.map(abstractRange, function(r) {
            return outputScale(r);
        });
        interpolator = d3.scale.linear().domain(domain).range(range).clamp(clamp);
    }
    attribute.inputRange = function(value) {
        if (!arguments.length) {
            return inputRange
        }
        if (!$.isArray(value) || value.length != 2) {
            throw "Error: input range must be an array of two values.";
        }
        inputRange = value;
        inputScale = d3.scale.linear().domain([0, 1]).range(inputRange);
        attribute._updateInterpolator()
        return attribute;
    }
    attribute.outputRange = function(value) {
        if (!arguments.length) {
            return outputRange
        }
        if (!$.isArray(value) || value.length != 2) {
            throw "Error: output range must be an array of two values.";
        }
        outputRange = value;
        outputScale = d3.scale.linear().domain([0, 1]).range(outputRange);
        attribute._updateInterpolator();
        return attribute;
    }
    attribute.clamp = function(value) {
        if (!arguments.length) {
            return outputRange
        }
        if (typeof value !== "boolean") {
            throw "Error: clamp must be a boolean value"
        }
        clamp = value;
        attribute._updateInterpolator();
        return attribute;
    }
    attribute.type = function(value) {
        if (!arguments.length) {
            return type
        }
        if (value !== "linear" && value !== "threshold") {
            throw "Error: attribute's scale type must be 'linear' or 'threshold'";
        }
        type = value;
        attribute._updateInterpolator();
        return attribute;
    }
    attribute.abstractDomain = function(value) {
        if (!arguments.length) {
            return abstractDomain
        }
        if (!$.isArray(value)) {
            throw "Error: attribute domain must be an array.";
        }
        abstractDomain = value;
        attribute._updateInterpolator();
        return attribute
    }
    attribute.abstractRange = function(value) {
        if (!arguments.length) {
            return abstractRange
        }
        if (!$.isArray(value)) {
            throw "Error: attribute range must be an array.";
        }
        abstractRange = value;
        attribute._updateInterpolator();
        return attribute
    }
    attribute.handleScroll = function(value) {
        scroll = value;
        var newValue = Math.round(interpolator(value) * 10) / 10;
        if (newValue == currentValue) {
            return false;
        } else {
            currentValue = newValue;
            return true;
        }
    }
    attribute._updateInterpolator();
    return attribute;
}
var makeThresholdFn = function() {
    var currentValue = 0;
    var scroll = 0;
    var abstractDomain = [0, 0.3, 1];
    var inputRange = [0, 100];
    var inputScale = d3.scale.linear().domain([0, 1]).range(inputRange);
    var domain = [0, 30, 100];
    var abstractRange = [0, 1, 1];
    var outputRange = [0, 1];
    var outputScale = d3.scale.linear().domain([0, 1]).range(outputRange);
    var range = [0, 1, 1];
    var interpolator;
    var handleResize = function() {};
    var attribute = function() {
        return currentValue;
    }
    attribute._updateInterpolator = function() {
        domain = _.map(abstractDomain, function(d) {
            return inputScale(d);
        });
        range = _.map(abstractRange, function(r) {
            return outputScale(r);
        });
        interpolator = f
    }
    attribute.inputRange = function(value) {
        if (!arguments.length) {
            return inputRange
        }
        if (!$.isArray(value) || value.length != 2) {
            throw "Error: input range must be an array of two values.";
        }
        inputRange = value;
        inputScale = d3.scale.linear().domain([0, 1]).range(inputRange);
        attribute._updateInterpolator()
        return attribute;
    }
    attribute.outputRange = function(value) {
        if (!arguments.length) {
            return outputRange
        }
        if (!$.isArray(value) || value.length != 2) {
            throw "Error: output range must be an array of two values.";
        }
        outputRange = value;
        outputScale = d3.scale.linear().domain([0, 1]).range(outputRange);
        attribute._updateInterpolator();
        return attribute;
    }
    attribute.clamp = function(value) {
        if (!arguments.length) {
            return outputRange
        }
        if (typeof value !== "boolean") {
            throw "Error: clamp must be a boolean value"
        }
        clamp = value;
        attribute._updateInterpolator();
        return attribute;
    }
    attribute.abstractDomain = function(value) {
        if (!arguments.length) {
            return abstractDomain
        }
        if (!$.isArray(value)) {
            throw "Error: attribute domain must be an array.";
        }
        abstractDomain = value;
        attribute._updateInterpolator();
        return attribute
    }
    attribute.abstractRange = function(value) {
        if (!arguments.length) {
            return abstractRange
        }
        if (!$.isArray(value)) {
            throw "Error: attribute range must be an array.";
        }
        abstractRange = value;
        attribute._updateInterpolator();
        return attribute
    }
    attribute.handleScroll = function(value) {
        scroll = value;
        var newValue = Math.round(interpolator(value) * 10) / 10;
        if (newValue == currentValue) {
            return false;
        } else {
            currentValue = newValue;
            return true;
        }
    }
    attribute._updateInterpolator();
    return attribute;
}
var Dispatcher = _.clone(Backbone.Events);
$window = $(window);
$window.on("resize", _.debounce(function() {
    Dispatcher.trigger("resize");
}, 700));
var R2D3Views = [];
var fps = 15;
var scrollTop = 0,
    actualScrollTop = 0;

function checkScroll() {
    actualScrollTop = $window.scrollTop();
    if (actualScrollTop != scrollTop) {
        newScrollTop = ZENO(scrollTop, actualScrollTop);
        Dispatcher.trigger("scroll", newScrollTop);
        scrollTop = newScrollTop;
    }
}

function draw() {
    requestAnimationFrame(draw);
    _.each(R2D3Views, function(v, i) {
        if (!v.rr) {
            return;
        }
        v.rr = false;
        v.render();
    });
    if (actualScrollTop != scrollTop) {
        newScrollTop = ZENO(scrollTop, actualScrollTop);
        Dispatcher.trigger("scroll", newScrollTop);
        scrollTop = newScrollTop;
    }
}
var LANG = $('html').attr('lang');
LANG = (typeof LANG !== 'undefined') ? LANG : 'en';
var DIMENSIONS = [{
    "id": "elevation"
}, {
    "id": "year_built"
}, {
    "id": "bath"
}, {
    "id": "beds"
}, {
    "id": "price"
}, {
    "id": "sqft"
}, {
    "id": "price_per_sqft"
}]
var DIMENSION_LONGFORM = {
    elevation: {
        "en": "elevation",
        "pt": "elevation",
        "ru": "возвышение",
        "zh-Hant": "海拔",
        "zh-Hans": "海拔",
        "fr": "altitude",
        "ar": "ارتفاع",
        "es": "elevación",
        "it": "elevazione",
        "tr": "ev-yükseklik",
        "id": "ketinggian",
        "de": "Höhe über Meeresspiegel",
        "el": "υψόμετρο"
    },
    year_built: {
        "en": "year built",
        "pt": "year built",
        "ru": "год постройки",
        "zh-Hant": "建成年份",
        "zh-Hans": "建成年份",
        "fr": "construction",
        "ar": "سنة البناء",
        "es": "año contrucción",
        "it": "anno costruzione",
        "tr": "year built",
        "id": "tahun pembangunan",
        "de": "Baujahr",
        "el": "έτος κατασκευής"
    },
    bath: {
        "en": "bathrooms",
        "pt": "bathrooms",
        "ru": "кол-во ванных",
        "zh-Hant": "浴室",
        "zh-Hans": "浴室",
        "fr": "bains",
        "ar": "حمام",
        "es": "baños",
        "it": "bagno",
        "id": "kamar mandi",
        "tr": "bathrooms",
        "el": "μπάνιο",
        "de": "Bad"
    },
    beds: {
        "en": "bedrooms",
        "pt": "bedrooms",
        "id": "kamar tidur",
        "ru": "кол-во спален",
        "zh-Hant": "臥室",
        "zh-Hans": "臥室",
        "fr": "pièces",
        "ar": "سرير",
        "es": "habitaciones",
        "it": "camera da letto",
        "tr": "bedrooms",
        "el": "κρεβάτια",
        "de": "Zimmer"
    },
    price: {
        "en": "price",
        "pt": "price",
        "ru": "стоимость",
        "zh-Hant": "價格",
        "zh-Hans": "價格",
        "id": "harga",
        "fr": "prix",
        "ar": "السعر",
        "es": "precio",
        "it": "prezzo",
        "tr": "fiyat",
        "el": "τιμή",
        "de": "Preis"
    },
    sqft: {
        "en": "square feet",
        "pt": "square meters",
        "ru": "площадь",
        "zh-Hant": "海拔",
        "zh-Hans": "海拔",
        "fr": "mètres",
        "ar": "قدم مربع",
        "es": "por metro cuadrado",
        "it": "metri quadri",
        "id": "kaki persegi",
        "tr": "square meters",
        "el": "τετραγωνικό πόδι",
        "de": "Quadratmeter"
    },
    price_per_sqft: {
        "en": "price per sqft",
        "pt": "price per meter",
        "ru": "цена за m²",
        "zh-Hant": "每平方公尺價格",
        "zh-Hans": "每平方公尺價格",
        "fr": "prix par mètre",
        "ar": "سعر القدم المربّع",
        "es": "precio por metro cuadrado",
        "it": "prezzo al metri quadri",
        "id": "harga per kaki persegi",
        "tr": "price per sqft",
        "el": "τιμή ανά τετραγωνικό πόδι",
        "de": "Preis pro Quadratmeter"
    }
}
var testAccuracyText = function(LANG) {
    switch (LANG) {
        case 'ru':
            return 'точность результатов на тестовой выборке'
        case 'fr':
            return 'précision sur les données de test'
        case 'ar':
            return 'دقة الاختبار'
        case 'es':
            return "precisión prueba"
        case 'it':
            return "accuratezza test"
        case 'id':
            return "ketepatan uji"
        case 'el':
            return "ακρίβεια ελέγχου"
        case 'de':
            return "Testgenauigkeit"
        case 'en':
        default:
            return 'Test Accuracy';
    }
}
var trainingAccuracyText = function(LANG) {
    switch (LANG) {
        case 'ru':
            return 'точность результатов на обучающей выборке'
        case 'fr':
            return 'précision sur les données d’apprentissage'
        case 'ar':
            return 'دقة التدريب'
        case 'es':
            return 'precisión entrenamiento'
        case 'it':
            return "accuratezza training"
        case 'id':
            return "ketepatan pelatihan"
        case 'el':
            return "ακρίβεια εκπαίδευσης"
        case 'de':
            return "Trainingsgenauigkeit"
        case 'en':
        default:
            return 'Training Accuracy';
    }
}
var DIMENSION_UNITS = {
    elevation: {
        prefix: "",
        suffix: "m"
    },
    year_built: {
        prefix: "",
        suffix: ""
    },
    bath: {
        prefix: "",
        suffix: "baths"
    },
    beds: {
        prefix: "",
        suffix: "bedrooms"
    },
    price: {
        prefix: "$",
        suffix: ""
    },
    sqft: {
        prefix: "",
        suffix: "sqft"
    },
    price_per_sqft: {
        prefix: "$",
        suffix: "per sqft"
    }
}
var UNIT_CONVERSION = function(value, unit, lang) {
    var IMPERIAL_UNITS = ['en'];
    var value = parseFloat(value);
    if (IMPERIAL_UNITS.indexOf(lang) < 0) {
        switch (unit) {
            case 'ft':
                var output_value = value * 0.3048;
                var output_unit = 'm';
                break;
            case 'sqft':
                var output_value = value * 0.092903;
                var output_unit = 'm²';
                break;
            case 'per sqft':
                var output_value = value * 10.7639;
                var output_unit = 'per m²';
                break;
            default:
                var output_value = value;
                var output_unit = unit;
        }
    } else {
        switch (unit) {
            case 'm':
                var output_value = value * 3.28084;
                var output_unit = 'ft';
                break;
            case 'm²':
                var output_value = value * 10.7639;
                var output_unit = 'sqft'
                break;
            case 'per m²':
                var output_value = value * 0.092903;
                var output_unit = 'per sqft'
                break;
            default:
                var output_value = value;
                var output_unit = unit;
        }
    }
    switch (lang) {
        case 'ru':
            if (output_unit === 'per m²') {
                output_unit = 'за m²';
            }
            break;
        case 'fr':
            if (output_unit === 'par m²') {
                output_unit = 'за m²';
            }
            break;
        case 'es':
            if (output_unit === 'por m²') {
                output_unit = 'за m²';
            }
            break;
        case 'it':
            if (output_unit === 'al m²') {
                output_unit = 'за m²';
            }
            break;
        case 'ar':
            if (output_unit === 'بالقدم المربع') {
                output_unit = 'за m²';
            }
            break;
    }
    return output_value.toFixed(1) + ' ' + output_unit;
}
_.each(DIMENSIONS, function(D) {
    D.min = _.min(tree_training_set, function(d) {
        return d[D.id];
    })[D.id];
    D.max = _.max(tree_training_set, function(d) {
        return d[D.id];
    })[D.id];
});
tree_training_set = _.shuffle(tree_training_set);
var FILL_FN = function(d, o) {
    if (!o) {
        o = 1;
    }
    if ((typeof d == "object" && d['target'] > 0.5) || d === "isTarget" || (typeof d == "boolean" && d)) {
        return "rgba(65,153,43," + o + ")";
    } else {
        return "rgba(16,70,131," + o + ")";
    }
}
var ZENO = function(current, actual) {
    var remainder = (current - actual) * 0.85;
    if (Math.abs(remainder) < 0.05) {
        return actual;
    } else {
        return remainder + actual;
    }
}
var isTargetFn = function(d) {
    return d['target'] > 0.5;
}
var BinContinuousDataByPredicate = function(args) {
    var min = _.min(args.data, function(d) {
        return d[args.key];
    })[args.key];
    var max = _.max(args.data, function(d) {
        return d[args.key];
    })[args.key];
    var range = max - min;
    var partition = _.partition(args.data, args.predicate);
    var isTargets = partition[0];
    var isTargetsGrouped = _.groupBy(isTargets, function(d) {
        return Math.floor((d[args.key] - min) / range * (args.bins - 1))
    });
    var isNotTargets = partition[1];
    var isNotTargetsGrouped = _.groupBy(isNotTargets, function(d) {
        return Math.floor((d[args.key] - min) / range * (args.bins - 1))
    });
    var maxPerBin = 0;
    var binnedData = _.map(_.range(args.bins), function(d) {
        var isTargetCount = 0;
        if (isTargetsGrouped[d]) {
            isTargetCount = isTargetsGrouped[d].length;
        }
        if (isTargetCount > maxPerBin) {
            maxPerBin = isTargetCount;
        }
        var isNotTargetCount = 0;
        if (isNotTargetsGrouped[d]) {
            isNotTargetCount = isNotTargetsGrouped[d].length;
        }
        if (isNotTargetCount > maxPerBin) {
            maxPerBin = isNotTargetCount;
        }
        return {
            "isTarget": isTargetCount,
            "isNotTarget": isNotTargetCount
        }
    });
    return {
        bins: binnedData,
        max: maxPerBin
    }
}
var ParseGeometryFromTreeData = function(tree_data) {
    var tree = d3.layout.tree().separation(function(a, b) {
        return a.parent == b.parent ? 1 : 1;
    });
    var nodes = tree.nodes(tree_data);
    _.each(nodes, function(n) {
        n.samples = parseInt(n.samples);
    });
    var links = tree.links(nodes);
    return {
        nodes: nodes,
        links: links
    }
}
var ParseLineageFromTreeData = function(tree_data) {
    var tree = d3.layout.tree();
    var nodes = tree.nodes(tree_data);
    var results = [];
    _.each(nodes, function(n) {
        var node = {
            id: parseInt(n.id),
        }
        if (n.children) {
            node.left = parseInt(n.children[0].id);
            node.right = parseInt(n.children[1].id);
        }
        results[parseInt(n.id)] = node;
    });
    return results;
}
var CompileDataForNode = function(data_table, tree_stats, nodeID) {
    var dataIDs = [];
    if (tree_stats[nodeID].data_rows) {
        if (tree_stats[nodeID].data_rows.true) {
            dataIDs = dataIDs.concat(tree_stats[nodeID].data_rows.true);
        }
        if (tree_stats[nodeID].data_rows.false) {
            dataIDs = dataIDs.concat(tree_stats[nodeID].data_rows.false);
        }
    }
    var data = _.map(dataIDs, function(id) {
        return _.find(data_table, function(d) {
            return d.index == id
        });
    });
    return data;
}
var CompileMixForNode = function(data_table, tree_stats, nodeID) {
    var dataIDs = [];
    var countTrue = 0;
    var countFalse = 0;
    if (tree_stats[nodeID].data_rows) {
        if (tree_stats[nodeID].data_rows.true) {
            countTrue = tree_stats[nodeID].data_rows.true.length;
        }
        if (tree_stats[nodeID].data_rows.false) {
            countFalse = tree_stats[nodeID].data_rows.false.length;
        }
        var total = countTrue + countFalse;
        var classification = "isTarget";
        if (countFalse > countTrue) {
            classification = "isNotTarget";
        }
        return {
            true: countTrue / total,
            false: countFalse / total,
            classification: classification
        }
    } else {
        return {
            true: 0,
            false: 0,
            classification: null
        }
    }
}
var ComputeSplit = function(data, key, splitValue) {
    var split = _.partition(data, function(d) {
        return d[key] >= splitValue
    });
    var gt = _.partition(split[0], isTargetFn);
    var lte = _.partition(split[1], isTargetFn)
    return {
        key: key,
        splitValue: splitValue,
        gt: {
            all: split[0],
            isTarget: gt[0],
            isNotTarget: gt[1]
        },
        lte: {
            all: split[1],
            isTarget: lte[0],
            isNotTarget: lte[1]
        }
    }
}
var ComputeAbstractScatterPlotPositions = function(dimensionsArray) {
    var plots = [];
    var diagonals = [];
    var i, j, count;
    for (i = 0; i < dimensionsArray.length; i++) {
        for (j = i + 1; j < dimensionsArray.length; j++) {
            var abstractX = j - 1;
            var abstractY = i;
            var d = i + (dimensionsArray.length - j) - 1;
            if (typeof diagonals[d] === "number") {
                diagonals[d] += 1;
            } else {
                diagonals[d] = 0;
            }
            var animationOrdinality = d * 2 + diagonals[d] + i - j + dimensionsArray.length;
            var totalPlots = (dimensionsArray.length * (dimensionsArray.length - 1) / 2);
            var abstractStart = animationOrdinality / totalPlots;
            var abstractEnd = (animationOrdinality + 1) / totalPlots;
            var plot = {
                abstractX: abstractX,
                abstractY: abstractY,
                abstractStart: abstractStart,
                abstractEnd: abstractEnd,
                verticalDimension: dimensionsArray[i].id,
                horizontalDimension: dimensionsArray[j].id,
            }
            plots.push(plot);
        }
    }
    _.each(plots, function(p, i) {
        if (p.abstractY == 0) {
            if (p.abstractX == dimensionsArray.length - 2) {
                p.source = p;
            } else {
                p.source = plots[i + 1];
            }
        } else {
            p.source = _.find(plots, function(p2) {
                return p2.abstractX == p.abstractX && p2.abstractY == (p.abstractY - 1);
            });
        }
    })
    return plots;
}
var ComputePrecisePlotAxis = function(precisePlots, dimensionsArray) {
    var verticalAxis = [];
    var horizontalAxis = [];
    precisePlots.forEach(function(plot) {
        if (verticalAxis.length < plot.abstractY + 1 && plot.abstractX == dimensionsArray.length - 2) {
            verticalAxis.push({
                id: plot.verticalDimension,
                scale: plot.scale.y,
                domain: [plot.verticalDomain.min, plot.verticalDomain.max],
                range: plot.extent.y,
                scrollExtent: plot.scrollExtent
            });
        }
        if (horizontalAxis.length < plot.abstractX + 1) {
            horizontalAxis.push({
                id: plot.horizontalDimension,
                scale: plot.scale.x,
                domain: [plot.horizontalDomain.min, plot.horizontalDomain.max],
                range: plot.extent.x,
                scrollExtent: plot.scrollExtent
            });
        }
    });
    return {
        x: horizontalAxis,
        y: verticalAxis
    }
}
var ComputePreciseScatterPlotPositions = function(totalLength, scrollExtent, dataDimensions, AbstractScatterPlotsAarray, dataPoints) {
    var margin = 30;
    var padding = 15;
    var sideLength = Math.floor((totalLength - ((dataDimensions.length - 1) * padding) - margin) / (dataDimensions.length));
    _.each(AbstractScatterPlotsAarray, function(plot, i) {
        var minX = (plot.abstractX + 1) * (padding + sideLength);
        var maxX = minX + sideLength;
        var minY = plot.abstractY * (padding + sideLength) + margin;
        var maxY = minY + sideLength;
        plot.extent = {};
        plot.extent.x = [minX, maxX];
        plot.extent.y = [maxY, minY];
        plot.scale = {};
        var horizontalDomain = _.find(dataDimensions, function(D) {
            return D.id == plot.horizontalDimension;
        });
        plot.scale.x = d3.scale.linear().domain([horizontalDomain.min, horizontalDomain.max]).range(plot.extent.x);
        plot.horizontalDomain = horizontalDomain;
        var verticalDomain = _.find(dataDimensions, function(D) {
            return D.id == plot.verticalDimension;
        });
        plot.scale.y = d3.scale.linear().domain([verticalDomain.min, verticalDomain.max]).range(plot.extent.y);
        plot.verticalDomain = verticalDomain;
        var scrollStart = scrollExtent[0] * (1 - plot.abstractStart) + scrollExtent[1] * plot.abstractStart
        var scrollEnd = scrollExtent[0] * (1 - plot.abstractEnd) + scrollExtent[1] * plot.abstractEnd
        plot.scrollExtent = [scrollStart, scrollEnd];
    });
    _.each(dataPoints, function(d, i) {
        for (var p = 0; p < AbstractScatterPlotsAarray.length; p++) {
            var plot = AbstractScatterPlotsAarray[p];
            if (!plot.points) {
                plot.points = [];
            }
            var startX = plot.source.scale.x(d[plot.source.horizontalDimension]);
            var startY = plot.source.scale.y(d[plot.source.verticalDimension]);
            var endX = plot.scale.x(d[plot.horizontalDimension]);
            var endY = plot.scale.y(d[plot.verticalDimension]);
            var quarterScroll = (plot.scrollExtent[1] - plot.scrollExtent[0]) / 2;
            if (d.target > 0.5) {
                var startTime = plot.scrollExtent[0];
                var endTime = plot.scrollExtent[1] - quarterScroll;
            } else {
                var startTime = plot.scrollExtent[0] + quarterScroll;
                var endTime = plot.scrollExtent[1];
            }
            var totalSpan = endTime - startTime;
            var delaySpan = totalSpan / 3;
            var motionSpan = totalSpan - delaySpan;
            var delayUnit = delaySpan / dataPoints.length;
            var pointDelay = i * delayUnit;
            startTime = startTime + pointDelay;
            endTime = endTime + pointDelay;
            plot.points[i] = {
                start: {
                    scroll: startTime,
                    x: startX,
                    y: startY,
                    opacity: 0
                },
                end: {
                    scroll: endTime,
                    x: endX,
                    y: endY,
                    opacity: 0.3
                },
                data: d
            }
        }
    });
    return AbstractScatterPlotsAarray;
}
_.each(tree_stats, function(node) {
    node.data = CompileDataForNode(tree_training_set, tree_stats, node.node);
    node.mix = CompileMixForNode(tree_training_set, tree_stats, node.node);
});
_.each(test_stats, function(node) {
    node.data = CompileDataForNode(tree_test_set, test_stats, node.node);
    node.mix = CompileMixForNode(tree_test_set, test_stats, node.node);
});
var ComputeTestTree = function(tree, test_set) {
    var test_tree = jQuery.extend(true, {}, tree);
    var test_stats = [];
    var partitionFork = function(tree, data, depth) {
        tree.samples = data.length;
        var target = _.partition(data, function(d) {
            return d.target > 0.5;
        });
        var split = _.partition(data, function(d) {
            return d[tree.key] > parseFloat(tree.value);
        });
        var isTargetLength = target[0].length / data.length;
        var isNotTargetLength = target[1].length / data.length;
        var gini = 1 - (isTargetLength * isTargetLength + isNotTargetLength * isNotTargetLength);
        tree.gini = gini;
        var hasChildren = (split[0].length > 0 && split[1].length > 0);
        var max = _.max(data, function(d) {
            return d[tree.key];
        })[tree.key];
        var min = _.min(data, function(d) {
            return d[tree.key];
        })[tree.key];
        var stats = {
            data: data,
            data_rows: {
                true: _.pluck(target[0], "index"),
                false: _.pluck(target[1], "index")
            },
            has_children: hasChildren,
            node: tree.id
        }
        test_stats[parseInt(stats.node)] = stats;
        if (hasChildren) {
            stats.attribute = tree.key, stats.max_val = max;
            stats.min_val = min;
            stats.data_values = {
                true: _.pluck(target[0], tree.key),
                false: _.pluck(target[1], tree.key)
            }
            stats.split_location = {
                left_side: split[1],
                right_side: split[0]
            }
            stats.split_point = tree.value
            partitionFork(tree.children[0], split[1], depth + 1);
            partitionFork(tree.children[1], split[0], depth + 1);
        }
    }
    partitionFork(test_tree, test_set, 0);
    return {
        tree: test_tree,
        stats: test_stats
    }
}
test_data = ComputeTestTree(tree_data, tree_test_set);
var StickyDivView = Backbone.View.extend({
    initialize: function(args) {
        this.cssProperties = {};
        this.thresholds = d3.scale.threshold();
        this.topFn = args.topFn;
        this.bottomFn = args.bottomFn;
        this.rr = true;
        R2D3Views.push(this);
        this.handleResize();
        this.handleScroll(0);
        this.cid = this.cid + "StickyDivView";
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.listenTo(Dispatcher, 'resize', this.handleResize);
    },
    handleResize: function() {
        this.topBound = this.topFn();
        this.bottomBound = this.bottomFn() - $window.height();
        this.thresholds.domain([this.topBound, this.bottomBound]).range([{
            top: this.topBound + "px",
            position: "absolute"
        }, {
            top: 0,
            position: "fixed"
        }, {
            top: this.bottomBound + "px",
            position: "absolute"
        }]);
        this.rr = true;
    },
    handleScroll: function(scroll) {
        var newCss = this.thresholds(scroll);
        if (!_.isEqual(this.cssProperties, newCss)) {
            this.cssProperties = newCss;
            this.render();
        }
    },
    render: function() {
        this.$el.css(this.cssProperties);
    }
});
var ScrollHinterView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        var setupHeight = $("#set-up").height();
        this.top = setupHeight;
        this.opacity = 1;
        this.opacityFn = d3.scale.linear().domain([0, 200]).range([1, 0]).clamp(true);
        this.topMarginFn = d3.scale.linear().domain([0, 200]).range([0, 200]).clamp(true);
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.listenTo(Dispatcher, 'resize', this.handleResize);
        this.rr = true;
        this.handleResize();
        this.handleScroll(0);
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        this.windowHeight = $window.height();
        var quarter = this.windowHeight / 6;
        var setupHeight = $("#set-up").height();
        this.opacityFn.domain([0, quarter * 0.7]);
        this.topMarginFn.domain([0, 0 + quarter]).range([setupHeight + 20, setupHeight + 220]);
    },
    handleScroll: function(scroll) {
        if (scroll > this.windowHeight * 2) {
            return;
        };
        var newOpacity = this.opacityFn(scroll);
        var newTop = this.topMarginFn(scroll);
        if (this.top != newTop || this.newOpacity != newOpacity) {
            this.top = newTop;
            this.opacity = newOpacity;
            this.hover = newOpacity > 0;
            this.rr = true;
        }
    },
    render: function() {
        this.el.attr('style', 'top: ' + this.top + 'px; opacity: ' + this.opacity + ';')
        this.child.classed('hover-animation', this.hover);
    }
});
var HousingAxisHistogram = Backbone.View.extend({
    initialize: function(args) {
        this.data = args.data;
        this.key = args.key;
        this.g = args.g;
        if (typeof args.split === "number" && !isNaN(args.split)) {
            this.split = args.split;
        } else {
            this.split = null;
        }
        this.width = 100;
        this.height = 25;
        this.orientation = "HORIZONTAL";
        this.barWidth = 2;
        this.barGap = 1;
        this.growth = 1;
        this.handleResize({
            width: this.width,
            height: this.height
        });
        this.cid = this.cid + "HousingAxisHistogram"
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        _.extend(this, args);
        if (this.orientation == "HORIZONTAL") {
            this.valueEdge = this.width;
            this.magnitudeEdge = this.height
        } else {
            this.valueEdge = this.height;
            this.magnitudeEdge = this.width
        }
        if (args.barWidth) {
            this.barWidth = args.barWidth;
        }
        if (args.barGap) {
            this.barGap = args.barGap;
        }
        this.sectionWidth = this.barWidth * 2 + this.barGap;
        this.binsCount = Math.floor(this.valueEdge / this.sectionWidth);
        this.binnedData = BinContinuousDataByPredicate({
            data: this.data,
            key: this.key,
            predicate: isTargetFn,
            bins: this.binsCount
        });
        if (this.fixedMagnitude) {
            this.max = this.fixedMagnitude;
        } else {
            this.max = this.binnedData.max;
        }
        this.binScale = d3.scale.linear().domain([0, this.max]).range([0, this.magnitudeEdge * this.growth]);
        if (this.split) {
            var v = this;
            var extent = d3.extent(this.data, function(s) {
                return s[v.key];
            });
            this.split_location = this.valueEdge / (extent[1] - extent[0]) * (this.split - extent[0]);
        }
        this.rr = true;
    },
    setBarGrowth: function(growth) {
        if (this.growth != growth) {
            this.growth = growth;
            this.binScale = d3.scale.linear().domain([0, this.max]).range([0, this.magnitudeEdge * this.growth]);
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.selection = d3.select(this.g).selectAll(".bin").data(this.binnedData.bins)
        this.selection.exit().remove()
        this.selection.enter().append("g").attr("class", "bin")
        this.selection.attr("transform", function(d, i) {
            if (v.orientation == "HORIZONTAL") {
                return "translate(" + (i * v.sectionWidth) + ",0)";
            } else {
                return "translate(0," + (i * v.sectionWidth) + ")";
            }
        }).each(function(d) {
            d3.select(this).selectAll("rect").remove()
            d3.select(this).append("rect").attr("class", "isTarget").attr("width", function(d) {
                if (v.orientation == "HORIZONTAL") {
                    return v.barWidth;
                } else {
                    return v.binScale(d.isTarget);
                }
            }).attr("height", function(d) {
                if (v.orientation != "HORIZONTAL") {
                    return v.barWidth;
                } else {
                    return v.binScale(d.isTarget);
                }
            }).attr("y", function(d) {
                if (v.orientation == "HORIZONTAL") {
                    return v.magnitudeEdge - v.binScale(d.isTarget);
                } else {
                    return 0
                }
            }).attr("x", function(d) {
                if (v.orientation != "HORIZONTAL") {
                    return v.magnitudeEdge - v.binScale(d.isTarget);
                } else {
                    return 0
                }
            }).attr("fill", FILL_FN("isTarget"))
            d3.select(this).append("rect").attr("class", "isNotTarget").attr("width", function(d) {
                if (v.orientation == "HORIZONTAL") {
                    return v.barWidth;
                } else {
                    return v.binScale(d.isNotTarget);
                }
            }).attr("height", function(d) {
                if (v.orientation != "HORIZONTAL") {
                    return v.barWidth;
                } else {
                    return v.binScale(d.isNotTarget);
                }
            }).attr("y", function(d) {
                if (v.orientation == "HORIZONTAL") {
                    return v.magnitudeEdge - v.binScale(d.isNotTarget);
                } else {
                    return v.barWidth
                }
            }).attr("x", function(d) {
                if (v.orientation != "HORIZONTAL") {
                    return v.magnitudeEdge - v.binScale(d.isNotTarget);
                } else {
                    return v.barWidth
                }
            }).attr("fill", FILL_FN("isNotTarget"))
        });
        if (this.split_location) {
            this.split_path = d3.select(this.g).select(".split_path");
            if (this.split_path.empty()) {
                this.split_path = d3.select(this.g).append('path').attr("fill", "#888888").classed("split_path", true);
            }
            var x = this.split_location;
            var y = this.magnitudeEdge + 5;
            var path = '';
            path += 'M ' + x + ' ' + y + ' ';
            path += 'L ' + (x + 4) + ' ' + (y + 4) + ' ';
            path += 'L ' + (x - 4) + ' ' + (y + 4) + ' ';
            path += 'Z';
            this.split_path.attr("d", path);
        }
        return this;
    }
})
var StaticScatterPlotView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.canvas = this.el.append('canvas');
        this.context = this.canvas.node().getContext('2d');
        plots = ComputeAbstractScatterPlotPositions(this.dimensionsArray);
        this.plots = ComputePreciseScatterPlotPositions(600, this.scrollExtent, this.dimensionsArray, plots, this.points);
        this.plotViews = [];
        this.plots.forEach(function(p, i) {
            var view = new DimensionPlotCanvas({
                context: this.context,
                plot: p,
                scrollExtent: this.scrollExtent,
                order: i
            });
            p.view = view;
            this.plotViews.push(view);
        }, this);
    },
    handleResize: function(data) {
        _.extend(this, data);
        this.canvas.attr('width', this.canvasLength * window.devicePixelRatio).attr('height', this.canvasLength * window.devicePixelRatio).attr('style', 'width: ' + this.canvasLength + 'px; height: ' + this.canvasLength + 'px; margin-top:' + this.marginTop + 'px');
        this.context = this.canvas.node().getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
        this.plots = ComputePreciseScatterPlotPositions(this.canvasLength, this.scrollExtent, this.dimensionsArray, plots, this.points);
        this.plotViews.forEach(function(pv) {
            pv.handleResize();
            pv.handleScroll(this.scrollExtent[1] + 3000);
        }, this);
        this.plotViews.forEach(function(pv) {
            pv.clean();
        });
        this.plotViews.forEach(function(pv) {
            pv.paint();
        });
    }
})
var HousingScatterPlotMatrixCanvas = Backbone.View.extend({
    initialize: function(args) {
        var v = this;
        _.extend(this, args);
        this.scrollSection = $('#more-variables');
        this.scrollExtent = [100, 1000];
        plots = ComputeAbstractScatterPlotPositions(this.dimensionsArray);
        this.data.plots = ComputePreciseScatterPlotPositions(600, this.scrollExtent, this.dimensionsArray, plots, this.data.points);
        this.data.axis = ComputePrecisePlotAxis(this.data.plots, this.dimensionsArray);
        this.canvas = this.el.append('canvas');
        this.context = this.canvas.node().getContext('2d');
        this.plotViews = [];
        this.data.plots.forEach(function(p, i) {
            var view = new DimensionPlotCanvas({
                context: this.context,
                plot: p,
                scrollExtent: this.scrollExtent,
                order: i
            });
            p.view = view;
            this.plotViews.push(view);
        }, this);
        this.staticPlot = new StaticScatterPlotView({
            el: d3.select('#shadow-scatterplot'),
            scrollExtent: this.scrollExtent,
            dimensionsArray: this.dimensionsArray,
            points: this.data.points,
            scrollExtent: this.scrollExtent
        });
        this.staticRetreat = new StaticPlotRetreat({
            el: this.staticPlot.el
        });
        this.elevationView = new VariableIntroductionView({
            el: this.el,
            dimensionsArray: this.dimensionsArray,
            plot: this.data.plots[5]
        });
        this.labelsGroup = this.elevationView.svg.append('g');
        this.labelsGroup.attr('id', 'scatterplot-labels-group').attr('opacity', 0);
        this.labels = this.labelsGroup.selectAll('text').data(DIMENSIONS);
        this.labels.enter().append('text')
        this.labels.text(function(d) {
            return DIMENSION_LONGFORM[d.id][LANG];
        }).attr('font-size', 10).attr('fill', '#555').attr('text-anchor', 'middle');
        this.handleResize();
        this.listenTo(Dispatcher, 'resize', this.handleResize);
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        v = this;
        this.bounds = this.el.node().getBoundingClientRect();
        this.canvasLength;
        if (this.bounds.height < this.bounds.width) {
            this.canvasLength = this.bounds.height;
        } else {
            this.canvasLength = this.bounds.width;
        }
        this.marginTop = 0;
        if (this.canvasLength < this.bounds.height) {
            this.marginTop = (this.bounds.height - this.canvasLength) / 2;
        }
        var windowHeight = $window.height();
        this.windowHeight = windowHeight;
        $setboundaries = $('#set-boundaries');
        $morevariables = $('#more-variables');
        var animationStart = $setboundaries.offset().top + 10;
        var animationFinish = $morevariables.offset().top + $morevariables.height() / 2 - windowHeight * 0.75;
        this.scrollExtent = [animationStart, animationFinish]
        this.canvas.attr('width', this.canvasLength * window.devicePixelRatio).attr('height', this.canvasLength * window.devicePixelRatio).attr('style', 'width: ' + this.canvasLength + 'px; height: ' + this.canvasLength + 'px; margin-top:' + this.marginTop + 'px');
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
        var plots = ComputePreciseScatterPlotPositions(this.canvasLength, this.scrollExtent, this.dimensionsArray, this.data.plots, this.data.points);
        this.data.plots = plots;
        this.labels.attr('x', function(d, i) {
            return (i + 0.5) * (v.canvasLength - 30) / (DIMENSIONS.length)
        }).attr('y', function(d, i) {
            return (i + 0.5) * (v.canvasLength - 30) / (DIMENSIONS.length) + 24 + 8
        });
        this.elevationView.handleResize({
            plot: this.data.plots[5]
        })
        this.plotViews.forEach(function(pv) {
            pv.handleResize();
        });
        this.plotViews.forEach(function(pv) {
            pv.clean();
        });
        this.plotViews.forEach(function(pv) {
            pv.paint();
        });
        this.staticPlot.handleResize({
            canvasLength: this.canvasLength,
            scrollExtent: this.scrollExtent,
            marginTop: this.marginTop
        });
        this.staticRetreat.handleResize();
        this.handleScroll(0);
    },
    handleScroll: function(scroll) {
        this.plotViews.forEach(function(pv) {
            pv.rr = pv.handleScroll(scroll);
            this.rr = pv.rr || this.rr;
        });
        this.staticRetreat.handleScroll(scroll);
        this.hideCanvas = scroll <= this.scrollExtent[0];
        if (scroll > (this.scrollExtent[1] + this.scrollExtent[0]) / 2) {
            this.labelsOpacity = 1;
        } else {
            this.labelsOpacity = 0;
        }
        this.rr = true;
    },
    render: function() {
        if (this.hideCanvas) {
            if (!this.canvas.classed('hideCanvas')) {
                this.canvas.classed('hideCanvas', true);
            }
        } else {
            if (this.canvas.classed('hideCanvas')) {
                this.canvas.classed('hideCanvas', false);
            }
        }
        this.labelsGroup.attr('opacity', this.labelsOpacity);
        this.plotViews.forEach(function(pv) {
            if (pv.rr) {
                pv.clean();
            }
        });
        this.plotViews.forEach(function(pv) {
            if (pv.rr) {
                if (pv.order != 5) {
                    pv.paint();
                }
                if (pv.plot.source.view.order != 5) {
                    pv.plot.source.view.paint();
                }
            }
        });
    }
})
var StaticPlotRetreat = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.staticPlotY = 0;
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function() {
        this.windowHeight = $window.height();
    },
    handleScroll: function(scroll) {
        var newY = -Math.pow(scroll, 0.96);
        if (newY < -this.windowHeight) {
            newY = -this.windowHeight;
        }
        if (this.staticPlotY != newY) {
            this.staticPlotY = newY;
            this.rr = true;
        }
    },
    render: function() {
        this.el.attr('style', 'transform: translate(0, ' + this.staticPlotY + 'px)');
    }
})
var DimensionPlotCanvas = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.currentScroll = 0;
        this.scrollExtent = [0, 1];
        this.pointViews = [];
        this.plot.points.forEach(function(point, i) {
            var pointView = new ScatterPlotPointCanvas({
                context: this.context,
                data: point,
                timing: {
                    abstractDomain: [this.plot.abstractStart, this.plot.abstractEnd],
                    abstractRange: [0, 1, 1]
                },
                scrollExtent: this.scrollExtent,
                order: i,
                parent: this.order
            });
            this.pointViews.push(pointView);
        }, this);
    },
    handleResize: function() {
        this.pointViews.forEach(function(view, i) {
            view.handleResize(this.plot.points[i]);
        }, this);
        this.minX = Math.min(this.plot.extent.x[0], this.plot.source.extent.x[0]);
        this.minY = Math.min(this.plot.extent.y[1], this.plot.source.extent.y[1]);
        this.maxX = Math.max(this.plot.extent.x[1], this.plot.source.extent.x[1]);
        this.maxY = Math.max(this.plot.extent.y[0], this.plot.source.extent.y[0]);
        this.canvasWidth = this.maxX - this.minX;
        this.canvasHeight = this.maxY - this.minY;
    },
    handleScroll: function(scroll) {
        var plotLength = this.plot.extent.x[1] - this.plot.extent.x[0];
        var repaint = false;
        this.pointViews.forEach(function(pv) {
            repaint = pv.handleScroll(scroll) || repaint;
        });
        return repaint;
    },
    clean: function() {
        var offWhite = 255;
        this.context.beginPath();
        this.context.fillStyle = "rgb(" + offWhite + ", " + offWhite + ", " + offWhite + ")";
        this.context.rect(this.minX - 3, this.minY - 3, this.canvasWidth + 6, this.canvasHeight + 6);
        this.context.fill();
    },
    paint: function() {
        this.pointViews.forEach(function(pv) {
            pv.paint();
        });
    }
})
var ScatterPlotPointCanvas = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.interpolator = function(v) {
            var preciseStart = 2000;
            var preciseEnd = 3000;
            var current = 'start';
            var scroll = 0;
            var interpolateX = d3.interpolateNumber(v.data.start.x, v.data.end.x);
            var interpolateY = d3.interpolateNumber(v.data.start.y, v.data.end.y);
            var interpolateO = d3.interpolateNumber(v.data.start.opacity, v.data.end.opacity);
            var interpolator = function() {
                return current;
            }
            interpolator.handleScroll = function(value) {
                if (arguments.length > 0) {
                    scroll = value;
                }
                var needsChange = false;
                if (scroll <= preciseStart) {
                    if (current != 'start') {
                        needsChange = true;
                    }
                    current = 'start';
                    v.needsPaint = false;
                    v.x = v.data.start.x;
                    v.y = v.data.start.y;
                    v.opacity = v.data.start.opacity;
                } else {
                    if (scroll > preciseEnd) {
                        if (current != 'end') {
                            needsChange = true;
                        }
                        current = 'end';
                        v.needsPaint = true;
                        v.x = v.data.end.x;
                        v.y = v.data.end.y;
                        v.opacity = v.data.end.opacity;
                    } else {
                        if (current != value) {
                            needsChange = true;
                        }
                        current = value;
                        progress = (value - preciseStart) / (preciseEnd - preciseStart);
                        v.needsPaint = true;
                        v.x = interpolateX(progress);
                        v.y = interpolateY(progress);
                        v.opacity = interpolateO(progress);
                    }
                }
                return needsChange;
            }
            interpolator.setExtent = function(extent) {
                preciseStart = extent[0];
                preciseEnd = extent[1];
                interpolatorFn = d3.interpolateNumber(preciseStart, preciseEnd);
            }
            interpolator.setRanges = function(data) {
                interpolateX = d3.interpolateNumber(data.start.x, data.end.x);
                interpolateY = d3.interpolateNumber(data.start.y, data.end.y);
            }
            return interpolator;
        }(this);
    },
    handleResize: function(data) {
        this.data = data;
        this.interpolator.setExtent([this.data.start.scroll, this.data.end.scroll]);
        this.interpolator.setRanges(data);
        this.interpolator.handleScroll();
        this.rr = true;
    },
    handleScroll: function(scroll) {
        return this.interpolator.handleScroll(scroll);
    },
    paint: function() {
        if (this.needsPaint) {
            this.context.beginPath();
            this.context.arc(this.x, this.y, 2.5, 0, Math.PI * 2, true);
            this.context.fillStyle = FILL_FN(this.data.data, this.opacity);
            this.context.fill();
        }
    }
})
var ScatterPlotPointBars = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        var v = this;
        this.x = -20;
        this.y = -20;
        this.BASE_RADIUS = 3;
        this.height = 5;
        this.radius = 0;
        this.opacity = 0;
        this.rect = this.el.append('rect');
        this.rect.classed('elevation-line', true).attr('height', this.BASE_RADIUS * 2).attr('width', this.BASE_RADIUS * 2).attr('x', function() {
            if (v.data.target < 0.5) {
                return -(v.BASE_RADIUS * 2);
            } else {
                return 0;
            }
        }).attr('y', function() {
            if (v.data.target < 0.5) {
                return -(v.BASE_RADIUS * 2);
            } else {
                return 0;
            }
        }).attr('fill', FILL_FN(this.data));
        this.rr = true;
        this.rotate = 0;
        if (this.data.target < 0.5) {
            this.rotate = 180;
        }
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        _.extend(this, args);
        var xMax = this.sideLength;
        var yMax = this.sideLength;
        var baseY = yMax;
        var baseWidth = this.sideLength / 2 - 18;
        var y = this.yScale(this.data[this.yAxisKey]);
        var yNormalized = this.yNormalizer(this.data[this.yAxisKey]);
        var x = this.xScale(this.data[this.xAxisKey]);
        var xNormalized = this.xNormalizer(this.data[this.xAxisKey]);
        var column = 0;
        if (this.data.target < 0.5) {
            column = 1;
            y += 0;
            baseY += 0;
        }
        this.xRanges = [xMax * column, x];
        this.yRanges = [baseY, y];
        this.widthRanges = [baseWidth, this.BASE_RADIUS * 2];
        this.shrinkTranslate = {
            x: this.shrinkExtent.x[0] - 25,
            y: this.shrinkExtent.y[0] - 25
        }
        this.shrinkRange = {
            x: this.shrinkExtent.x[1] - this.shrinkExtent.x[0],
            y: this.shrinkExtent.y[1] - this.shrinkExtent.y[0],
        }
        this.xShrink = [x, this.xDestination - 27]
        this.yShrink = [y, this.yDestination - 27]
        this.interpolator = {
            x: d3.interpolateNumber(this.xRanges[0], this.xRanges[1]),
            y: d3.interpolateNumber(this.yRanges[0], this.yRanges[1]),
            width: d3.interpolateNumber(this.widthRanges[0], this.widthRanges[1]),
            x2: d3.interpolateNumber(this.xShrink[0], this.xShrink[1]),
            y2: d3.interpolateNumber(this.yShrink[0], this.yShrink[1]),
        }
        var staggerRange = this.staggerRange;
        var duration = this.duration;
        var riseStarts = this.riseStart;
        var riseRange = this.riseRange;
        var shortenStarts = this.scatterStart;
        var shortenRange = this.scatterRange * 0.6;
        var scatterStarts = shortenStarts + shortenRange + this.scatterRange * 0.1;
        var scatterRange = this.scatterRange * 0.3
        var shrinkStarts = this.shrinkStart;
        this.scrollExtents = {
            rise: [riseStarts + riseRange * this.orderNormalized, riseStarts + duration + riseRange * this.orderNormalized],
            shorten: [shortenStarts + shortenRange * yNormalized, shortenStarts + duration * 12 + shortenRange * yNormalized],
            scatter: [scatterStarts + scatterRange * yNormalized, scatterStarts + duration * 12 + scatterRange * yNormalized],
            shrink: [shrinkStarts + staggerRange * (1 - this.orderNormalized), shrinkStarts + duration * 12 + staggerRange * (1 - this.orderNormalized)]
        }
    },
    handleScroll: function(scroll) {
        var new_x, new_y, new_width, new_opacity;
        if (scroll < this.scrollExtents.shrink[0]) {
            if (scroll > this.scrollExtents.rise[0] && scroll <= this.scrollExtents.rise[1]) {
                var progress = (scroll - this.scrollExtents.rise[0]) / (this.scrollExtents.rise[1] - this.scrollExtents.rise[0]);
                new_y = this.interpolator.y(progress);
            } else {
                if (scroll < this.scrollExtents.rise[0]) {
                    new_y = this.yRanges[0];
                    new_opacity = 0;
                } else {
                    new_y = this.yRanges[1];
                    new_opacity = 0.4;
                }
            }
            if (this.y != Math.round(new_y)) {
                this.rr = true;
                this.y = Math.round(new_y);
            }
            if (scroll > this.scrollExtents.shorten[0] && scroll <= this.scrollExtents.shorten[1]) {
                var progress_shorten = (scroll - this.scrollExtents.shorten[0]) / (this.scrollExtents.shorten[1] - this.scrollExtents.shorten[0]);
                new_width = this.interpolator.width(progress_shorten);
                this.radius = 0;
                this.opacity = 0.4;
            } else {
                if (scroll < this.scrollExtents.shorten[0]) {
                    new_width = this.widthRanges[0];
                } else {
                    new_width = this.widthRanges[1];
                    this.radius = this.BASE_RADIUS;
                    new_opacity = 0.8;
                }
            }
            if (this.width != Math.round(new_width)) {
                this.rr = true;
                this.width = Math.round(new_width);
            }
            if (scroll > this.scrollExtents.scatter[0] && scroll <= this.scrollExtents.scatter[1]) {
                var progress_scatter = (scroll - this.scrollExtents.scatter[0]) / (this.scrollExtents.scatter[1] - this.scrollExtents.scatter[0]);
                new_x = this.interpolator.x(progress_scatter);
            } else {
                if (scroll < this.scrollExtents.scatter[0]) {
                    new_x = this.xRanges[0];
                } else {
                    new_x = this.xRanges[1];
                }
            }
            if (this.x != Math.round(new_x)) {
                this.rr = true;
                this.x = Math.round(new_x);
            }
            if (this.opacity != new_opacity) {
                this.rr = true;
                this.opacity = new_opacity;
            }
        } else {
            if (scroll > this.scrollExtents.shrink[0] && scroll <= this.scrollExtents.shrink[1]) {
                var progress_shrink = (scroll - this.scrollExtents.shrink[0]) / (this.scrollExtents.shrink[1] - this.scrollExtents.shrink[0]);
                new_x = this.interpolator.x2(progress_shrink);
                new_y = this.interpolator.y2(progress_shrink);
            } else {
                new_x = this.xShrink[1];
                new_y = this.yShrink[1]
            }
            new_opacity = 0.4;
            if (this.x != new_x) {
                this.rr = true;
                this.x = new_x;
            }
            if (this.y != new_y) {
                this.rr = true;
                this.y = new_y;
            }
            if (this.opacity != new_opacity) {
                this.rr = true;
                this.opacity = new_opacity;
            }
            this.radius = this.BASE_RADIUS;
            this.width = Math.round(this.widthRanges[1]);
        }
    },
    render: function() {
        var transformString = 'translate(' + this.x + ', ' + this.y + ') rotate(' + this.rotate + ')';
        this.el.attr('opacity', this.opacity);
        if (this.el.attr('transform') !== transformString) {
            this.el.attr('transform', 'translate(' + this.x + ', ' + this.y + ') rotate(' + this.rotate + ')');
        }
        if (parseFloat(this.rect.attr('width')) != this.width) {
            this.rect.attr('rx', this.radius).attr('ry', this.radius).attr('width', this.width);
        }
    }
})
var VariableIntroOverlayView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.overlays = this.g.selectAll('rect').data(this.splits);
        this.overlays.enter().append('rect').attr('opacity', 0.1).attr('fill', function(d) {
            return d.label.fill;
        });
        this.rr = true;
        R2D3Views.push(this);
        this.growthRate = 2;
    },
    handleResize: function(args) {
        _.extend(this, args);
        var v = this;
        this.overlays.each(function(d) {
            if (d.axis == 'x') {
                if (d.direction > 0) {
                    d.finalLength = d.splitPoint.normalized * v.sideLength;
                } else {
                    d.finalLength = (1 - d.splitPoint.normalized) * v.sideLength;
                }
            } else {
                if (d.direction > 0) {
                    d.finalLength = (1 - d.splitPoint.normalized) * v.sideLength;
                } else {
                    d.finalLength = d.splitPoint.normalized * v.sideLength;
                }
            }
        });
        this.rr = true;
    },
    handleScroll: function(scroll) {
        var v = this;
        var delay = 0;
        this.overlays.each(function(d) {
            d.actualLength = (scroll - (v.start + delay)) * v.growthRate;
            if (d.actualLength < 0) {
                d.actualLength = 0;
            }
            if (d.actualLength > d.finalLength) {
                d.actualLength = d.finalLength;
            }
        });
        this.rr = true;
    },
    render: function() {
        var v = this;
        this.overlays.attr('x', function(d) {
            if (d.axis == 'x') {
                return d.splitPoint.normalized * v.sideLength;
            } else {
                return d.start * v.sideLength;
            }
        }).attr('y', function(d) {
            if (d.axis == 'x') {
                return (1 - d.start) * v.sideLength;
            } else {
                return d.finalLength - d.actualLength;
            }
        }).attr('width', function(d) {
            if (d.axis == 'x') {
                return d.actualLength;
            } else {
                return (d.end - d.start) * v.sideLength;
            }
        }).attr('height', function(d) {
            if (d.axis == 'x') {
                return (1 - (d.end - d.start)) * v.sideLength;
            } else {
                return d.actualLength;
            }
        });
    }
})
var VariableIntroductionView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        var v = this;
        this.svg = this.el.append('svg').attr('id', 'variable-intro-svg');
        this.g = this.svg.append('g');
        this.overlayGroup = this.svg.append('g');
        var xAxisKey = 'price_per_sqft';
        var yAxisKey = 'elevation';
        this.xDomain = d3.extent(this.plot.points, function(d) {
            return d.data[xAxisKey];
        }, this);
        this.yDomain = d3.extent(this.plot.points, function(d) {
            return d.data[yAxisKey];
        }, this);
        var overallY_extent = d3.extent(this.plot.points, function(d) {
            return d.data[yAxisKey];
        });
        this.yNormalizer = d3.scale.linear().domain(overallY_extent).range([0, 1])
        this.yScale = d3.scale.linear().domain(overallY_extent);
        var isTargetY_Max = d3.max(this.plot.points, function(d) {
            if (d.data.target > 0.5) {
                return d.data[yAxisKey]
            } else {
                return -Infinity;
            }
        });
        var isNotTargetY_Max = d3.max(this.plot.points, function(d) {
            if (d.data.target < 0.5) {
                return d.data[yAxisKey]
            } else {
                return -Infinity;
            }
        });
        this.elevationMarkersData = [{
            value: overallY_extent[0],
            normalized: 0,
            x: -200,
            y: -200
        }, {
            value: isTargetY_Max,
            normalized: (isTargetY_Max - overallY_extent[0]) / (overallY_extent[1] - overallY_extent[0]),
            x: -200,
            y: -200
        }, {
            value: isNotTargetY_Max,
            normalized: (isNotTargetY_Max - overallY_extent[0]) / (overallY_extent[1] - overallY_extent[0]),
            x: -200,
            y: -200
        }]
        this.elevationMarkers = this.overlayGroup.selectAll('.elevationMarkerGroup').data(this.elevationMarkersData);
        this.elevationMarkers.enter().append('g').attr('class', 'elevationMarkerGroup').attr('opacity', 0).each(function(d) {
            var g = d3.select(this);
            g.append('text').text(UNIT_CONVERSION(d.value, 'm', LANG)).attr('font-size', 11).attr('color', '#aaaaaa').attr('text-anchor', 'middle');
        });
        var overallX_extent = d3.extent(this.plot.points, function(d) {
            return d.data[xAxisKey];
        });
        this.xNormalizer = d3.scale.linear().domain(overallX_extent).range([0, 1]);
        this.xScale = d3.scale.linear().domain(overallX_extent);
        var isTargetX_Max = d3.max(this.plot.points, function(d) {
            if (d.data.target > 0.5) {
                return d.data[xAxisKey]
            } else {
                return -Infinity;
            }
        });
        var isNotTargetX_Max = d3.max(this.plot.points, function(d) {
            if (d.data.target < 0.5) {
                return d.data[xAxisKey]
            } else {
                return -Infinity;
            }
        });
        this.psqfMarkersData = [{
            value: overallX_extent[0],
            normalized: 0,
            x: -200,
            y: -200
        }, {
            value: isTargetX_Max,
            normalized: (isTargetX_Max - overallX_extent[0]) / (overallX_extent[1] - overallX_extent[0]),
            x: -200,
            y: -200
        }, {
            value: isNotTargetX_Max,
            normalized: (isNotTargetX_Max - overallX_extent[0]) / (overallX_extent[1] - overallX_extent[0]),
            x: -200,
            y: -200
        }]
        this.psqfMarkers = this.overlayGroup.selectAll('.psqfMarkerGroup').data(this.psqfMarkersData);
        this.psqfMarkers.enter().append('g').attr('class', 'psqfMarkerGroup').attr('opacity', 0).each(function(d, i) {
            var g = d3.select(this);
            var textAnchor = "middle";
            if (i == 0) {
                textAnchor = "start"
            }
            if (i >= v.psqfMarkersData.length - 1) {
                textAnchor = "end";
            }
            g.append('text').text('$' + UNIT_CONVERSION(d.value, 'per sqft', LANG)).attr('font-size', 11).attr('color', '#aaaaaa').attr('text-anchor', textAnchor);
        });
        var sortedPoints = _.sortBy(this.plot.points, function(d) {
            return d.data[yAxisKey];
        });
        this.pointsIndex = [];
        this.plot.points.forEach(function(p) {
            this.pointsIndex.push(p.data.index);
        }, this)
        this.lines = _.map(sortedPoints, function(d, i) {
            var g = this.g.append('g');
            return new ScatterPlotPointBars({
                el: g,
                data: d.data,
                xAxisKey: xAxisKey,
                yAxisKey: yAxisKey,
                xNormalizer: this.xNormalizer,
                yNormalizer: this.yNormalizer,
                xDomain: this.xDomain,
                yDomain: this.yDomain,
                xDestination: d.end.x,
                yDestination: d.end.y,
                shrinkExtent: this.plot.extent,
                orderNormalized: i / this.plot.points.length
            });
        }, this);
        this.overlay = new VariableIntroOverlayView({
            g: this.overlayGroup,
            splits: [{
                axis: "y",
                splitPoint: this.elevationMarkersData[2],
                start: 0,
                end: 1,
                direction: 1,
                label: {
                    text: "San Francisco",
                    normalizedPosition: this.psqfMarkersData[1].normalized,
                    fill: FILL_FN(true)
                }
            }, {
                axis: "x",
                splitPoint: this.psqfMarkersData[1],
                start: this.elevationMarkersData[2].normalized,
                end: 1,
                direction: -1,
                label: {
                    text: "New York",
                    normalizedPosition: 0,
                    fill: FILL_FN(false)
                }
            }]
        });
        this.opacityFn = d3.scale.linear().range([1, 0]).clamp(true);
        this.handleResize({
            plot: this.plot
        });
        this.rr = true;
        this.scroll = 0;
        R2D3Views.push(this);
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
    },
    handleResize: function(args) {
        var windowHeight = $window.height();
        var newPlot = args.plot;
        var $setup = $('#set-up');
        var $firsttwo = $('#first-two');
        var $addnuance = $('#add-nuance');
        var $setboundaries = $('#set-boundaries')
        var riseStart = $setup.offset().top + 10;
        var riseFinish = $firsttwo.offset().top + $firsttwo.height() / 2 - windowHeight * 0.55;
        var scatterStart = $firsttwo.offset().top + 10;
        var scatterFinish = $addnuance.offset().top + $addnuance.height() / 2 - windowHeight * 0.55;
        var boundaryStart = $addnuance.offset().top + 10;
        var boundaryFinish = $setboundaries.offset().top + $setboundaries.height() / 2 - windowHeight * 0.55;
        var shrinkStart = $setboundaries.offset().top + 10;
        var bounds = this.el.node().getBoundingClientRect();
        var fullSide, shortSide;
        if (bounds.height < bounds.width) {
            fullSide = bounds.height;
            shortSide = fullSide * 0.95;
        } else {
            fullSide = bounds.width;
            shortSide = fullSide * 0.95;
        }
        var marginTop = 0;
        if (fullSide < bounds.height) {
            marginTop = (bounds.height - fullSide) / 2;
        }
        var padding = 25;
        this.sideLength = shortSide - 2 * padding;
        this.svg.attr('width', fullSide).attr('height', fullSide).attr('style', 'margin-top: ' + marginTop + 'px');
        this.g.attr('transform', 'translate(' + padding + ', ' + padding + ')');
        this.overlayGroup.attr('transform', 'translate(' + (padding + 3) + ', ' + (padding + 3) + ')');
        this.xScale.range([0, this.sideLength]);
        this.yScale.range([this.sideLength, 0]);
        this.duration = 7;
        this.staggerRange = windowHeight * 0.4;
        this.riseStart = riseStart;
        this.riseFinish = riseFinish;
        this.riseRange = riseFinish - riseStart;
        this.scatterStart = scatterStart;
        this.scatterFinish = scatterFinish;
        this.scatterRange = scatterFinish - scatterStart;
        this.shrinkStart = shrinkStart;
        this.lines.forEach(function(line) {
            var i = this.pointsIndex.indexOf(line.data.index);
            line.handleResize({
                xScale: this.xScale,
                yScale: this.yScale,
                xDestination: newPlot.points[i].end.x,
                yDestination: newPlot.points[i].end.y,
                sideLength: this.sideLength,
                riseStart: this.riseStart,
                riseRange: this.riseRange,
                scatterStart: this.scatterStart,
                scatterRange: this.scatterRange,
                shrinkStart: this.shrinkStart,
                shrinkExtent: newPlot.extent,
                duration: this.duration,
                staggerRange: this.staggerRange
            })
        }, this);
        this.overlay.handleResize({
            padding: padding,
            sideLength: this.sideLength,
            start: boundaryStart
        });
        this.opacityFn.domain([this.shrinkStart, this.shrinkStart + windowHeight / 4]);
    },
    handleScroll: function(scroll) {
        var v = this;
        var newOpacity = Math.round(this.opacityFn(scroll) * 20) / 20;
        if (this.opacity != newOpacity) {
            this.rr = true;
            this.opacity = newOpacity;
        }
        this.lines.forEach(function(line) {
            line.handleScroll(scroll);
        })
        this.elevationMarkersData.forEach(function(d) {
            var start = v.riseStart;
            var scrollProgress = (scroll - start) / v.riseRange;
            if (scrollProgress > 1) {
                scrollProgress = 1;
            }
            if (scrollProgress < 0) {
                scrollProgress = 0;
            }
            var y = this.sideLength - ((scrollProgress) * this.sideLength * d.normalized) + 4;
            var shiftProgress = (scroll - (v.scatterStart)) / 200;
            if (shiftProgress > 1) {
                shiftProgress = 1;
            }
            if (shiftProgress < 0) {
                shiftProgress = 0;
            }
            var x = v.sideLength / 2 + shiftProgress * (v.sideLength / 2 + 20);
            if (d.x != x || d.y != y || d.opacity != scrollProgress) {
                this.rr = true;
            }
            d.x = x;
            d.y = y;
            d.opacity = scrollProgress;
        }, this);
        this.psqfMarkersData.forEach(function(d) {
            var start = v.scatterStart + v.scatterRange * 0.5;
            var scrollProgress = (scroll - start) / 200;
            if (scrollProgress > 1) {
                scrollProgress = 1;
            }
            if (scrollProgress < 0) {
                scrollProgress = 0;
            }
            var x = this.sideLength * d.normalized;
            var y = v.sideLength + 30;
            if (d.x != x || d.y != y || d.opacity != scrollProgress) {
                this.rr = true;
            }
            d.x = x;
            d.y = y;
            d.opacity = scrollProgress;
        }, this);
        this.overlay.handleScroll(scroll);
    },
    render: function() {
        this.elevationMarkers.attr('opacity', function(d) {
            return d.opacity;
        }).attr('transform', function(d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        })
        this.psqfMarkers.attr('opacity', function(d) {
            return d.opacity;
        }).attr('transform', function(d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        })
        this.overlayGroup.attr('opacity', this.opacity);
    }
})
var DataTableView = Backbone.View.extend({
    initialize: function(args) {
        this.cid = this.cid + "DataTableView";
        this.data = args.data;
        this.table = d3.select(this.el).append("table").attr("class", "data-table");
        this.thead = this.table.append("thead");
        this.rows = 8;
        this.offset = 0;
        var v = this;
        this.renderCell = function() {
            return function(d) {
                d3.select(this).datum(d).text(d);
            }
        }();
        this.renderRow = function() {
            return function(d) {
                d3.select(this).selectAll("td").data(_.values(d)).enter().append("td").each(v.renderCell);
            }
        }();
        this.rr = true;
        R2D3Views.push(this);
    },
    render: function() {
        var v = this;
        var keys = _.chain(this.data).first().keys().value();
        this.thead.selectAll("th").data(keys).enter().append("th").each(v.renderCell);
        this.table.selectAll("tr").data(this.data.slice(this.offset, this.offset + this.rows)).enter().append("tr").each(v.renderRow);
    }
})
var SplitQualityView = Backbone.View.extend({
    initialize: function(args) {
        this.cid = this.cid + "SplitQualityView";
        var v = this;
        this.stats = args.stats;
        this.key = this.stats.attribute;
        this.data = this.stats.data;
        this.tree = args.tree;
        this.bestSplit = parseInt(this.stats.split_point);
        this.setSplitPoint(this.bestSplit);
        this.interpolator = d3.interpolateNumber(this.stats.min_val, this.stats.max_val);
        this.radiusFn = this.setMaxRadius(100);
        this.canvasContainer = d3.select(this.el).append('div');
        this.canvasContainer.attr('id', 'rotating-canvas');
        this.canvas = this.canvasContainer.append('canvas');
        this.svg = d3.select(this.el).append("svg");
        this.parent = args.parent;
        this.$giniSection = $("#explain-gini");
        this.$furtherSection = $("#further-split");
        this.histogramY = 10;
        this.histogramOpacity = 1;
        this.histogramView = new ElevationToHistogramView({
            container: v.canvasContainer,
            canvas: v.canvas,
            data: v.data,
            key: v.key
        });
        this.splitIndicator = new SplitIndicator({
            g: this.svg.append("g").attr("class", "split_indicator"),
            data: {
                split: this.bestSplit,
                opacity: 0
            }
        })
        this.pieVerticalOffset = 100;
        this.pieLayer = this.svg.append("g").attr("class", "pie_layer");
        this.pieView = new PieComparisonView({
            g: v.pieLayer.node()
        })
        this.accuracyIndicator = new AccuracyIndicator({
            g: this.pieView.g.append("g").attr("class", "accuracy_indicator"),
            accuracy: 1,
            opacity: 1
        });
        this.gtLayer = this.pieLayer.append("g").attr("class", "gt_pie").attr("transform", "translate(400,100)");
        this.gtView = new GiniPieChartView({
            data: {
                total: this.splitData.gt.all.length,
                parts: [{
                    key: "isTarget",
                    count: this.splitData.gt.isTarget.length
                }, {
                    key: "isNotTarget",
                    count: this.splitData.gt.isNotTarget.length
                }]
            },
            g: v.gtLayer.node(),
            sizes: {
                radiusFn: this.radiusFn
            }
        });
        this.lteLayer = this.pieLayer.append("g").attr("class", "lte_pie").attr("transform", "translate(100,100)");
        this.lteView = new GiniPieChartView({
            data: {
                total: this.splitData.lte.all.length,
                parts: [{
                    key: "isTarget",
                    count: this.splitData.lte.isTarget.length
                }, {
                    key: "isNotTarget",
                    count: this.splitData.lte.isNotTarget.length
                }]
            },
            g: v.lteLayer.node(),
            sizes: {
                radiusFn: this.radiusFn
            }
        });
        this.furtherSplitLayer = this.svg.append("g");
        this.furtherSplitLayer.attr("class", "splitLayer");
        this.furtherSplitView = new SplitHistogramComparisonView({
            g: this.furtherSplitLayer,
            stats: this.stats,
            data: this.data,
            tree: this.tree
        });
        this.handleResize();
        this.rr = true;
        R2D3Views.push(this);
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.listenTo(Dispatcher, 'resize', this.handleResize);
    },
    setMaxRadius: function(maxRadius) {
        var v = this;
        var maxSize = Math.PI * maxRadius * maxRadius;
        return function(count) {
            size = maxSize * count / v.data.length;
            radius = Math.sqrt(size / Math.PI);
            return radius;
        }
    },
    setSplitPoint: function(splitValue) {
        if (!this.splitData || splitValue != this.splitData.splitValue) {
            this.splitData = ComputeSplit(this.data, this.key, splitValue);
            if (this.gtView) {
                this.gtView.setData({
                    total: this.splitData.gt.all.length,
                    parts: [{
                        key: "isTarget",
                        count: this.splitData.gt.isTarget.length
                    }, {
                        key: "isNotTarget",
                        count: this.splitData.gt.isNotTarget.length
                    }]
                });
            }
            if (this.lteView) {
                this.lteView.setData({
                    total: this.splitData.lte.all.length,
                    parts: [{
                        key: "isTarget",
                        count: this.splitData.lte.isTarget.length
                    }, {
                        key: "isNotTarget",
                        count: this.splitData.lte.isNotTarget.length
                    }]
                });
            }
            if (this.splitIndicator) {
                this.splitIndicator.setSplit(splitValue)
            }
            if (this.accuracyIndicator) {
                var correct = this.splitData.gt.isTarget.length + this.splitData.lte.isNotTarget.length;
                var total = this.splitData.gt.isTarget.length + this.splitData.gt.isNotTarget.length + this.splitData.lte.isTarget.length + this.splitData.lte.isNotTarget.length;
                this.accuracyIndicator.setAccuracyRate(correct / total);
            }
            this.rr = true;
        }
    },
    handleResize: function(args) {
        var v = this;
        var windowHeight = $window.height();
        this.bounds = this.el.getBoundingClientRect();
        this.width = this.bounds.width;
        this.height = this.bounds.height;
        this.padding = 40;
        this.canvasLength = this.bounds.width;
        if (this.bounds.height < this.canvasLength) {
            this.canvasLength = this.bounds.height;
        }
        this.histogramHeight = (this.canvasLength - 2 * this.padding) / 3
        this.baseline = this.histogramHeight + this.padding;
        this.histogramView.handleResize({
            bounds: this.bounds,
            padding: this.padding,
            canvasLength: this.canvasLength,
            baseline: this.baseline,
            histogramHeight: this.histogramHeight
        });
        var furtherOffsetTop = this.$furtherSection.offset().top;
        var domain = [furtherOffsetTop - windowHeight * 0.3, furtherOffsetTop]
        this.opacityThresholds = d3.scale.linear().domain(domain).range([1, 0, 0]).clamp(true);
        this.yThresholds = d3.scale.linear().domain(domain).range([windowHeight * 0.02, windowHeight * -0.4, windowHeight * -0.4]).clamp(true);
        var indicatorXfn = d3.scale.linear().domain([this.stats.min_val, this.stats.max_val]).range([this.padding, this.canvasLength - this.padding]);
        this.splitIndicator.handleResize(this.baseline + this.padding, indicatorXfn);
        var giniOffsetTop = this.$giniSection.offset().top;
        var giniHeight = this.$giniSection.height();
        this.thresholds = d3.scale.threshold().domain([giniOffsetTop, giniOffsetTop + giniHeight * 0.01, giniOffsetTop + giniHeight * 0.3, giniOffsetTop + giniHeight * 0.65, giniOffsetTop + giniHeight * 0.8, giniOffsetTop + giniHeight * 0.9, ]).range([function(scroll) {
            v.setSplitPoint(v.interpolator(0.325));
            v.splitIndicator.setOpacity(0);
        }, function(scroll) {
            v.setSplitPoint(v.interpolator(0.325));
            v.splitIndicator.setOpacity(1);
        }, function(scroll) {
            v.setSplitPoint(v.interpolator(0.325));
            v.splitIndicator.setOpacity(1);
        }, function(scroll) {
            v.setSplitPoint(v.interpolator(0));
            v.splitIndicator.setOpacity(1);
        }, function(scroll) {
            v.setSplitPoint(v.bestSplit);
            v.splitIndicator.setOpacity(1);
        }, function(scroll) {
            v.setSplitPoint(v.bestSplit);
            v.splitIndicator.setOpacity(1);
        }, function(scroll) {
            v.setSplitPoint(v.bestSplit);
            v.splitIndicator.setOpacity(0);
        }])
        this.radiusFn = this.setMaxRadius(this.canvasLength / 6);
        this.accuracyIndicator.handleResize({
            x: this.width / 2,
            y: this.pieVerticalOffset
        })
        this.gtView.handleResize({
            radiusFn: this.radiusFn
        });
        this.lteView.handleResize({
            radiusFn: this.radiusFn
        });
        this.furtherSplitView.handleResize({
            width: this.width,
            height: windowHeight * 0.4
        });
        this.rr = true;
    },
    handleScroll: function(scroll) {
        this.thresholds(scroll)(scroll);
        var newY = this.yThresholds(scroll);
        if (this.histogramY != newY) {
            this.histogramY = newY;
            this.histogramOpacity = this.opacityThresholds(scroll);
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.svg.attr("width", this.width).attr("height", this.height);
        this.canvas.style("top", this.histogramY + "px").style("opacity", this.histogramOpacity);
        this.gtLayer.attr("transform", "translate(" + (this.canvasLength * 0.8) + ", " + this.pieVerticalOffset + ")");
        this.lteLayer.attr("transform", "translate(" + (this.canvasLength * 0.2) + ", " + this.pieVerticalOffset + ")");
    }
});
var ElevationToHistogramView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        var v = this;
        this.$section = $('#elevation-to-histogram');
        this.context = this.canvas.node().getContext('2d');
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.key = 'elevation';
        this.domain = d3.extent(this.data, function(d) {
            return d[v.key];
        });
        this.points = [];
        this.binCount = 40;
        this.binExtents = function(extent, count) {
            var interval = (extent[1] - extent[0]) / (count);
            var domain = [];
            var range = [0];
            for (var i = 1; i < count; i++) {
                domain.push(interval * i);
                range.push(i);
            }
            return {
                domain: domain,
                range: range
            }
        }(this.domain, this.binCount);
        this.binMapper = d3.scale.threshold().domain(this.binExtents.domain).range(this.binExtents.range);
        this.bins = {
            all: [],
            isTarget: [],
            isNotTarget: []
        }
        this.binExtents.range.forEach(function(binKey) {
            var SFbin = new RainBinView({
                count: this.binCount,
                ordinality: binKey,
                context: this.context,
                points: [],
                isTarget: true
            });
            this.bins.isTarget.push(SFbin);
            this.bins.all.push(SFbin);
            var NYbin = new RainBinView({
                count: this.binCount,
                ordinality: binKey,
                context: this.context,
                points: [],
                isTarget: false
            });
            this.bins.isNotTarget.push(NYbin);
            this.bins.all.push(NYbin);
        }, this);
        this.data.forEach(function(d) {
            var point = new ElevationRainDrop({
                context: this.context,
                data: d,
                domain: this.domain
            });
            this.points.push(point);
            var binKey = this.binMapper(d[this.key]);
            if (d.target > 0.5) {
                this.bins.isTarget[binKey].points.push(point);
            } else {
                this.bins.isNotTarget[binKey].points.push(point);
            }
        }, this);
        this.bins.maxBinSize = _.chain([this.bins.isTarget, this.bins.isNotTarget]).map(function(bins) {
            var max = _.max(bins, function(bin) {
                return bin.points.length;
            });
            return max.points.length;
        }).max(function(groupMax) {
            return groupMax
        }).value();
        var sortedByElevationOverall = _.sortBy(this.points, function(p) {
            return p.data[v.key];
        });
        sortedByElevationOverall.forEach(function(p, i) {
            p.overallOrder = i;
        })
        var sortedByElevationInNY = _.chain(this.points).filter(function(p) {
            return p.data.target < 0.5;
        }).sortBy(function(p) {
            return p.data[v.key];
        }).value();
        sortedByElevationInNY.forEach(function(p, i) {
            p.inGroupOrder = i;
        })
        var sortedByElevationInSF = _.chain(this.points).filter(function(p) {
            return p.data.target > 0.5;
        }).sortBy(function(p) {
            return p.data[v.key];
        }).value();
        sortedByElevationInSF.forEach(function(p, i) {
            p.inGroupOrder = i;
        })
        this.rotate = {
            target: -90,
            current: 0
        };
        this.rotateRange = [-90, 0];
        this.rotationInterpolator = d3.interpolateNumber(this.rotateRange[0], this.rotateRange[1]);
        this.buckets = [];
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        _.extend(this, args);
        this.offsetTop = this.$section.offset().top;
        this.sectionHeight = this.$section.height();
        this.windowHeight = $window.height();
        this.scrollExtent = [this.offsetTop, this.offsetTop + this.sectionHeight]
        this.scrollDuration = this.scrollExtent[1] - this.scrollExtent[0];
        this.scrollSections = {};
        this.scrollSections.rotate = [this.offsetTop + this.scrollDuration * 0.01, this.offsetTop + this.scrollDuration * 0.07]
        this.scrollSections.shrink = [this.scrollSections.rotate[1] - this.scrollDuration * 0.03, this.scrollSections.rotate[1] + this.scrollDuration * 0.06]
        this.scrollSections.fall = [this.scrollSections.shrink[1] + this.scrollDuration * 0.01, this.scrollSections.shrink[1] + this.scrollDuration * 0.45]
        this.canvas.attr('width', this.canvasLength * window.devicePixelRatio).attr('height', this.canvasLength * window.devicePixelRatio).attr('style', 'width: ' + this.canvasLength + 'px; height: ' + this.canvasLength + 'px;');
        this.context = this.canvas.node().getContext('2d');
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.range = [this.padding, this.canvasLength - this.padding];
        this.elevationScale = d3.scale.linear().domain(this.domain).range(this.range);
        this.heightScale = d3.scale.linear().domain([0, this.bins.maxBinSize]).range([0, this.histogramHeight]);
        this.points.forEach(function(p) {
            p.handleResize({
                canvasLength: this.canvasLength,
                baseline: this.baseline,
                padding: this.padding,
                scale: this.elevationScale,
                scrollSections: this.scrollSections
            });
        }, this);
        this.binWidth = (this.canvasLength - 2 * this.padding) / this.binCount;
        this.barWidth = Math.floor((this.binWidth - 3) / 2);
        this.bins.all.forEach(function(b) {
            b.handleResize({
                barWidth: this.barWidth,
                binWidth: this.binWidth,
                baseline: this.baseline,
                bounds: this.bounds,
                padding: this.padding,
                scale: this.heightScale
            })
        }, this)
        this.handleScroll();
        this.render();
    },
    handleScroll: function(scroll) {
        if (scroll == this.scroll) {
            return;
        }
        if (scroll <= this.scrollExtent[0]) {
            scroll = this.scrollExtent[0];
        }
        if (scroll >= this.scrollExtent[1]) {
            scroll = this.scrollExtent[1];
        }
        this.scroll = scroll;
        if (scroll > this.scrollSections.rotate[0] && scroll <= this.scrollSections.rotate[1]) {
            this.rotate.target = this.rotationInterpolator((scroll - this.scrollSections.rotate[0]) / (this.scrollSections.rotate[1] - this.scrollSections.rotate[0]));
        } else {
            if (scroll <= this.scrollSections.rotate[0]) {
                this.rotate.target = this.rotateRange[0];
            } else {
                this.rotate.target = this.rotateRange[1];
            }
        }
        this.points.forEach(function(p) {
            p.handleScroll(scroll);
        });
        this.bins.all.forEach(function(b) {
            b.handleScroll(scroll);
        });
        this.rr = true;
    },
    render: function() {
        if (this.rotate.current != this.rotate.target) {
            this.container.attr('style', '-webkit-transform: rotate(' + this.rotate.target + 'deg); transform: rotate(' + this.rotate.target + 'deg);');
            this.rotate.current = this.rotate.target;
        }
        this.context.clearRect(0, 0, this.bounds.width, this.bounds.height);
        this.points.forEach(function(p) {
            p.paint();
        });
        this.bins.all.forEach(function(b) {
            b.paint();
        })
    }
})
var RainBinView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.target = {
            x: -10,
            y: -10,
            width: 0,
            height: 0
        }
    },
    handleResize: function(args) {
        _.extend(this, args);
        this.target = {
            x: this.ordinality * this.binWidth + this.padding,
            y: this.baseline,
            width: this.barWidth,
            height: -25
        }
        if (!this.isTarget) {
            this.target.x += (this.binWidth / 2);
        }
    },
    handleScroll: function() {
        var done = _.countBy(this.points, function(p) {
            return p.done ? 'done' : 'not_done';
        });
        this.target.height = -this.scale(done.done);
    },
    paint: function() {
        this.context.fillStyle = FILL_FN(this.isTarget, 1);
        this.context.fillRect(this.target.x, this.target.y, this.target.width, this.target.height);
    }
})
var ElevationRainDrop = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.key = 'elevation';
        this.scroll = 0;
    },
    handleResize: function(args) {
        _.extend(this, args);
        this.minHeight = this.padding / 4;
        this.fullHeight = (this.canvasLength - 3 * this.padding) / 2;
        var shrinkDuration = (this.scrollSections.shrink[1] - this.scrollSections.shrink[0]) / 2;
        var shrinkDelay = shrinkDuration;
        var shrinkFactor = 1 - (this.data[this.key] - this.domain[0]) / (this.domain[1] - this.domain[0]);
        var fallDuration = (this.scrollSections.fall[1] - this.scrollSections.fall[0]) / 6;
        var fallDelay = (this.scrollSections.fall[1] - this.scrollSections.fall[0] - fallDuration) / 350;
        var fallFactor = this.inGroupOrder;
        var bottom = this.baseline + 3;
        if (this.data.target > 0.5) {
            fallFactor = this.inGroupOrder + 167;
        }
        if (this.data.target < 0.5) {
            var y0 = this.canvasLength - this.padding - this.fullHeight;
            var y1 = this.padding * 2;
            this.yFn = d3.scale.linear().domain([this.scrollSections.shrink[0] + shrinkDelay * shrinkFactor, this.scrollSections.shrink[0] + shrinkDuration + shrinkDelay * shrinkFactor, this.scrollSections.fall[0] + fallDelay * fallFactor, this.scrollSections.fall[0] + fallDelay * fallFactor + fallDuration]).range([y0, y1, y1, bottom]).clamp(true);
        } else {
            this.yFn = d3.scale.linear().domain([this.scrollSections.shrink[0] + shrinkDelay * shrinkFactor, this.scrollSections.shrink[0] + shrinkDuration + shrinkDelay * shrinkFactor, this.scrollSections.fall[0] + fallDelay * fallFactor, this.scrollSections.fall[0] + fallDelay * fallFactor + fallDuration]).range([this.padding, this.padding, this.padding, bottom]).clamp(true);
        }
        this.fallFinishesAt = this.scrollSections.fall[0] + fallDelay * fallFactor + fallDuration;
        this.heightFn = d3.scale.linear().domain([this.scrollSections.shrink[0] + shrinkDelay * shrinkFactor, this.scrollSections.shrink[0] + shrinkDuration + shrinkDelay * shrinkFactor]).range([this.fullHeight, this.minHeight]).clamp(true);
        this.handleScroll(this.scroll);
    },
    handleScroll: function(scroll) {
        this.scroll = scroll;
        var x = this.scale(this.data[this.key]);
        var width = 5;
        this.target = {
            x: x,
            y: this.yFn(scroll),
            width: width,
            height: this.heightFn(scroll)
        }
        this.done = scroll > this.fallFinishesAt;
    },
    paint: function() {
        this.context.fillStyle = FILL_FN(this.data, 0.3);
        this.context.fillRect(this.target.x, this.target.y, this.target.width, this.target.height);
    }
})
var SplitHistogramComparisonView = Backbone.View.extend({
    initialize: function(args) {
        this.data = args.data;
        this.stats = args.stats;
        this.tree = args.tree;
        this.g = args.g;
        this.y = 100;
        this.opacity = 0;
        var currentNodeID = parseInt(this.stats.node);
        var lineage = ParseLineageFromTreeData(this.tree);
        this.$section = $("#further-split");
        this.gtLayer = this.g.append("g").attr("class", "split_gtLayer");
        var gtNodeID = lineage[currentNodeID].right;
        this.gtView = new SplitHistogramView({
            data: tree_stats[gtNodeID],
            g: this.gtLayer.node(),
            barScale: this.barScale
        });
        var rightSideAttribute = DIMENSION_LONGFORM[tree_stats[gtNodeID].attribute][LANG];
        var rightSideValue = DIMENSION_UNITS[tree_stats[gtNodeID].attribute].prefix + Math.round(parseFloat(tree_stats[gtNodeID].split_point)) + ' ' + DIMENSION_UNITS[tree_stats[gtNodeID].attribute].suffix;
        $('#right-side-split-attribute').text(rightSideAttribute);
        $('#right-side-split-value').text(rightSideValue);
        this.lteLayer = this.g.append("g").attr("class", "split_lteLayer");
        var ltNodeID = lineage[currentNodeID].left;
        this.lteView = new SplitHistogramView({
            data: tree_stats[ltNodeID],
            g: this.lteLayer.node(),
            barScale: this.barScale
        });
        var leftSideAttribute = DIMENSION_LONGFORM[tree_stats[ltNodeID].attribute][LANG];
        var leftSideValue = DIMENSION_UNITS[tree_stats[ltNodeID].attribute].prefix + Math.round(parseFloat(tree_stats[ltNodeID].split_point)) + ' ' + DIMENSION_UNITS[tree_stats[ltNodeID].attribute].suffix;
        $('#left-side-split-attribute').text(leftSideAttribute);
        $('#left-side-split-value').text(leftSideValue);
        this.labels = this.g.selectAll(".label").data(DIMENSIONS).enter().append("text").attr("class", "label").attr("text-anchor", "middle").attr("y", function(d, i) {
            return i * 30;
        }).text(function(d) {
            return DIMENSION_LONGFORM[d.id][LANG];
        });
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        this.width = args.width;
        this.height = args.height;
        this.gtTransform = "translate(" + (this.width * 0.6) + ",0)";
        this.lteTransform = "translate(0,0)";
        this.histogramSizes = {
            width: this.width * 0.4,
            height: this.height
        }
        this.gtView.handleResize(this.histogramSizes);
        this.lteView.handleResize(this.histogramSizes);
        var sectionOffsetTop = this.$section.offset().top;
        var sectionHeight = this.$section.height();
        var windowHeight = $window.height();
        var domain = [sectionOffsetTop - windowHeight * 0.2, sectionOffsetTop]
        this.opacityThresholds = d3.scale.linear().domain(domain).range([0, 1, 1]).clamp(true);
        this.yThresholds = d3.scale.linear().domain(domain).range([windowHeight * 0.8, windowHeight * 0.5, windowHeight * 0.5]).clamp(true);
        this.rr = true;
    },
    handleScroll: function(scroll) {
        var newOpacity = this.opacityThresholds(scroll);
        if (this.opacity != newOpacity) {
            this.opacity = newOpacity;
            this.rr = true;
        }
        var newY = this.yThresholds(scroll);
        if (this.y != newY) {
            this.y = this.yThresholds(scroll);
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.g.attr("opacity", this.opacity).attr("transform", "translate(0," + this.y + ")");
        this.gtLayer.attr("transform", this.gtTransform);
        this.lteLayer.attr("transform", this.lteTransform);
        this.labels.attr("y", function(d, i) {
            var vertical = v.height / DIMENSIONS.length;
            var offset = vertical * (i + 0.75);
            return offset;
        }).attr("x", this.width / 2);
    }
})
var SplitHistogramView = Backbone.View.extend({
    initialize: function(args) {
        var v = this;
        this.data = args.data;
        this.g = args.g;
        this.$section = $("#further-split");
        this.fade = false;
        this.children = d3.select(this.g).selectAll(".sub_split_histograms").data(DIMENSIONS).enter().append("g").attr("class", "sub_split_histograms").each(function(d) {
            this.view = new HousingAxisHistogram({
                data: v.data.data,
                key: d.id,
                g: this
            });
            this.view.opacity = {
                true: 0.1,
                false: 1
            }
            if (d.id === v.data.attribute) {
                this.view.key = v.data.attribute;
                this.view.split = parseFloat(v.data.split_point);
                this.view.opacity[true] = 1;
            }
            this.view.fixedMagnitude = 35;
        });
        this.listenTo(Dispatcher, "scroll", this.handleScroll);
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        var v = this;
        this.height = args.height;
        this.width = args.width;
        this.children.each(function(d) {
            this.view.handleResize({
                width: v.width,
                height: v.height / DIMENSIONS.length * 0.8,
                barWidth: 4,
                barGap: 1
            })
        })
        var sectionOffsetTop = this.$section.offset().top;
        var sectionHeight = this.$section.height();
        var windowHeight = $window.height();
        this.fadeThreshold = sectionOffsetTop + sectionHeight * 0.25;
        this.rr = true;
    },
    handleScroll: function(scroll) {
        var newFade;
        if (scroll > this.fadeThreshold) {
            newFade = true;
        } else {
            newFade = false;
        }
        if (newFade != this.fade) {
            this.fade = newFade;
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.children.each(function(d, i) {
            var y = v.height / DIMENSIONS.length * i;
            d3.select(this).attr("transform", "translate(0," + y + ")").attr("style", "opacity: " + this.view.opacity[v.fade] + ";");
        });
    }
})
var PieComparisonView = Backbone.View.extend({
    initialize: function(args) {
        this.g = d3.select(args.g);
        this.$section = $("#explain-gini");
        this.geometry = {
            offsetTop: 500,
            opacity: 0
        }
        this.listenTo(Dispatcher, "scroll", this.handleScroll);
        this.listenTo(Dispatcher, "resize", this.handleResize);
        this.handleResize();
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function() {
        var windowHeight = $window.height();
        var parentOffsetTop = this.$section.offset().top;
        var parentHeight = this.$section.height();
        var start = parentOffsetTop;
        var end = parentOffsetTop + parentHeight;
        var domain = [start - windowHeight * 0.3, start, end - windowHeight * 0.3, end, ];
        var offStage = windowHeight * 0.8;
        var centerStage = windowHeight * 0.5;
        var upStage = windowHeight * 0.1;
        var offsetTop = {
            enter: d3.scale.linear().domain([domain[0], domain[1]]).range([offStage, centerStage]).clamp(true),
            exit: d3.scale.linear().domain([domain[2], domain[3]]).range([centerStage, upStage]).clamp(true)
        }
        var opacity = {
            enter: d3.scale.linear().domain([domain[0], domain[1]]).range([0, 1]).clamp(true),
            exit: d3.scale.linear().domain([domain[2], domain[3]]).range([1, 1]).clamp(true)
        }
        this.thresholds = d3.scale.threshold().domain(domain).range([function(scroll) {
            return {
                offsetTop: offsetTop.enter(scroll),
                opacity: opacity.enter(scroll)
            }
        }, function(scroll) {
            return {
                offsetTop: offsetTop.enter(scroll),
                opacity: opacity.enter(scroll)
            }
        }, function(scroll) {
            return {
                offsetTop: offsetTop.enter(scroll),
                opacity: opacity.enter(scroll)
            }
        }, function(scroll) {
            return {
                offsetTop: offsetTop.exit(scroll),
                opacity: opacity.exit(scroll)
            }
        }, function(scroll) {
            return {
                offsetTop: offsetTop.exit(scroll),
                opacity: opacity.exit(scroll)
            }
        }])
        this.rr = true;
    },
    handleScroll: function(scroll) {
        var newGeometry = this.thresholds(scroll)(scroll);
        if (!_.isEqual(this.geometry, newGeometry)) {
            this.geometry = newGeometry;
            this.rr = true;
        }
    },
    render: function() {
        this.g.attr("transform", "translate(0," + this.geometry.offsetTop + ")").attr("opacity", this.geometry.opacity);
    }
})
var GiniPieChartView = Backbone.View.extend({
    initialize: function(args) {
        this.data = args.data;
        this.current = this.data;
        this.g = args.g;
        this.sizes = args.sizes;
        this.radius = this.sizes.radiusFn(this.data.total);
        this.arc = d3.svg.arc().outerRadius(this.sizes.radiusFn(this.radius)).innerRadius(0);
        this.pie = d3.layout.pie().sort(null).value(function(d) {
            return d.count;
        });
        this.selection = d3.select(this.g).selectAll(".arc").data(this.pie(this.data.parts)).enter().append("g").attr("class", "arc");
        this.selection.each(function(d) {
            d3.select(this).append("path");
        });
        this.isTargetNumberText = d3.select(this.g).append("g").attr("class", "pie_text");
        this.isTargetNumberView = new GiniPieNumber({
            g: this.isTargetNumberText,
            data: this.data.parts[0].count,
            label: "SF",
            fill: FILL_FN("isTarget")
        });
        this.isNotTargetNumberText = d3.select(this.g).append("g").attr("class", "pie_text");
        this.isNotTargetNumberView = new GiniPieNumber({
            g: this.isNotTargetNumberText,
            data: this.data.parts[1].count,
            label: "NY",
            fill: FILL_FN("isNotTarget")
        });
        this.frames = 0;
        this.rr = true;
        R2D3Views.push(this);
    },
    setData: function(data) {
        if (!_.isEqual(this.data, data)) {
            this.data = data;
            this.frames = 90;
            this.interpolateData();
            this.isTargetNumberView.setData(this.data.parts[0].count);
            this.isNotTargetNumberView.setData(this.data.parts[1].count);
        }
    },
    handleResize: function(sizes) {
        if (!_.isEqual(this.sizes, sizes)) {
            this.sizes = sizes;
            this.arc = d3.svg.arc().outerRadius(this.sizes.radiusFn(this.data.total)).innerRadius(0);
            this.rr = true;
        };
    },
    interpolateData: function() {
        var v = this;
        if (this.frames > 0) {
            this.current = {
                total: ZENO(this.current.total, this.data.total),
                parts: _.map(this.data.parts, function(p, i) {
                    return {
                        key: p.key,
                        count: ZENO(v.current.parts[i].count, p.count)
                    }
                })
            }
        } else {
            this.current = this.data;
        }
        if (_.isEqual(this.data, this.current)) {
            this.frames = 0;
        }
        this.radius = this.sizes.radiusFn(this.current.total);
        this.arc = d3.svg.arc().outerRadius(this.radius).innerRadius(0);
        this.selection.data(this.pie(this.current.parts));
        if (this.frames > 0) {
            this.frames--;
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.selection.each(function(d) {
            d3.select(this).select("path").attr("d", v.arc).style("fill", function(d) {
                return FILL_FN(d.data.key);
            });
        });
        this.isNotTargetNumberText.attr("transform", "translate(-70," + (this.radius + 40) + ")");
        this.isTargetNumberText.attr("transform", "translate(70," + (this.radius + 40) + ")");
        this.interpolateData();
    }
})
var AccuracyIndicator = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.current = {
            accuracy: this.accuracy,
            opacity: this.opacity
        }
        this.data = {
            accuracy: 1,
            opacity: 1
        }
        this.labelNode = this.g.append("text").attr("text-anchor", "middle").attr("font-size", 10).attr("y", 18).text("% correct");
        this.textNode = this.g.append("text").attr("font-size", 36).attr("y", 2).attr("text-anchor", "middle");
        this.x = 0;
        this.y = 0;
        this.frames = 90;
        this.rr = true;
        R2D3Views.push(this);
    },
    setAccuracyRate: function(accuracy) {
        if (this.data.accuracy != accuracy) {
            this.data.accuracy = accuracy;
            this.frames = 90;
            this.rr = true;
        }
    },
    setOpacity: function(opacity) {
        if (this.data.opacity != opacity) {
            this.data.opacity = opacity;
            this.frames = 90;
            this.rr = true;
        }
    },
    interpolateData: function() {
        if (this.frames > 0) {
            this.current = {
                accuracy: ZENO(this.current.accuracy, this.data.accuracy),
                opacity: ZENO(this.current.opacity, this.data.opacity)
            }
        } else {
            this.current.accuracy = this.data.accuracy;
            this.current.opacity = this.data.opacity;
        }
        if (this.frames > 0) {
            this.frames--;
            this.rr = true;
        }
    },
    handleResize: function(args) {
        _.extend(this, args);
        this.rr = true;
    },
    render: function() {
        var displayNumber = Math.round(this.current.accuracy * 100);
        this.textNode.text(displayNumber);
        this.g.attr("transform", "translate(" + this.x + ", " + this.y + ")").attr("opacity", this.current.opacity)
        this.interpolateData();
    }
})
var SplitIndicator = Backbone.View.extend({
    initialize: function(args) {
        this.data = args.data;
        this.current = {
            split: 0,
            opacity: 0
        };
        this.g = args.g;
        this.textNode = this.g.append("text").attr("text-anchor", "middle").attr("y", 23);
        var d = "M 0 0 ";
        d += "L 5 8 ";
        d += "L -5 8 ";
        d += "L 0 0 ";
        this.arrow = this.g.append("path").attr("d", d);
        this.x = 0;
        this.y = 0;
        this.frames = 90;
        this.rr = true;
        R2D3Views.push(this);
    },
    setSplit: function(split) {
        if (split != this.data.split) {
            this.data.split = split;
            this.frames = 90;
            this.rr = true;
        }
    },
    setOpacity: function(opacity) {
        if (opacity != this.data.opacity) {
            this.data.opacity = opacity;
            this.frames = 90;
            this.rr = true;
        }
    },
    interpolateData: function() {
        if (this.frames > 0) {
            this.current = {
                split: ZENO(this.current.split, this.data.split),
                opacity: ZENO(this.current.opacity, this.data.opacity)
            }
        } else {
            this.current = this.data;
        }
        if (_.isEqual(this.data, this.current)) {
            this.frames = 0;
        }
        this.x = this.xFn(this.current.split);
        if (this.frames > 0) {
            this.frames--;
            this.rr = true;
        }
    },
    handleResize: function(y, xFn) {
        this.y = y;
        this.xFn = xFn;
        this.rr = true;
    },
    render: function() {
        var displayNumber = UNIT_CONVERSION(Math.round(this.current.split), 'm', LANG);
        this.textNode.text(displayNumber);
        this.g.attr("transform", "translate(" + this.x + "," + this.y + ")").attr("opacity", this.current.opacity)
        this.interpolateData();
    }
})
var GiniPieNumber = Backbone.View.extend({
    initialize: function(args) {
        this.data = args.data;
        this.current = this.data;
        this.g = args.g;
        this.fill = args.fill;
        this.textNode = this.g.append("text").attr("y", 0).attr("font-size", 24).attr("font-weight", "bold").attr("text-anchor", "middle").attr("fill", this.fill);
        this.label = args.label;
        this.labelNode = this.g.append("text").attr("y", 24).attr("font-size", 14).attr("text-anchor", "middle").text(this.label);
        this.frames = 0;
        this.rr = true;
        R2D3Views.push(this);
    },
    setData: function(data) {
        if (!_.isEqual(this.data, data)) {
            this.data = data;
            this.frames = 90;
            this.interpolateData();
        }
    },
    interpolateData: function() {
        if (this.frames > 0) {
            this.current = ZENO(this.current, this.data);
        } else {
            this.current = this.data;
        }
        if (_.isEqual(this.data, this.current)) {
            this.frames = 0;
        }
        if (this.frames > 0) {
            this.frames--;
            this.rr = true;
        }
    },
    render: function() {
        var displayNumber = Math.round(this.current);
        this.textNode.text(displayNumber);
        this.interpolateData();
    }
})
var DecisionTreeView = Backbone.View.extend({
    initialize: function(args) {
        this.cid = this.cid + "DecisionTreeView";
        var v = this;
        this.data = args.data;
        this.tree = ParseGeometryFromTreeData(this.data.tree);
        this.stats = this.data.stats;
        this.maxDepth = _.max(this.tree.nodes, function(d) {
            return d.depth;
        })["depth"];
        this.verticalPadding = 30;
        this.$section = $("#tree");
        this.svg = d3.select(this.el).append("svg");
        this.links_layer = this.svg.append("g").attr("class", "links_layer").attr("transform", "translate(0, " + this.verticalPadding + ")");
        var nodeLinks = {};
        this.links = this.links_layer.selectAll(".tree_link").data(this.tree.links).enter().append("path").attr("class", "tree_link").attr("stroke", "#dddddd").attr("fill", "none").each(function(d) {
            if (!nodeLinks[d.source.id]) {
                nodeLinks[d.source.id] = [this];
            } else {
                nodeLinks[d.source.id].push(this);
            }
        });
        this.nodes_layer = this.svg.append("g").attr("class", "nodes_layer").attr("transform", "translate(0, " + this.verticalPadding + ")");
        this.nodes = this.nodes_layer.selectAll(".node").data(this.tree.nodes).enter().append("g").attr("class", "node").each(function(d) {
            if (!v.stats[d.id]) {
                return;
            }
            this.view = new TreeNodeView({
                g: this,
                node: d,
                depth: d.depth,
                stats: v.stats[d.id],
                maxDepth: v.maxDepth,
                fixedMagnitude: v.data.stats[0].data.length / 8,
                links: nodeLinks[d.id]
            });
        });
        this.handleResize();
        this.listenTo(Dispatcher, 'resize', this.handleResize);
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        var v = this;
        var windowHeight = $window.height();
        this.width = this.$el.width();
        this.height = windowHeight * 0.9;
        this.innerHeight = this.height - windowHeight * 0.15;
        this.layerHeight = this.innerHeight / 8;
        this.graphHeight = this.layerHeight * 0.7;
        this.graphGap = this.layerHeight - this.graphHeight;
        this.x_scale = d3.scale.linear().domain([0, 1]).range([0, this.width]);
        this.y_scale = d3.scale.linear().domain([0, 1]).range([0, this.innerHeight]);
        var sectionOffsetTop = this.$section.offset().top;
        var sectionHeight = this.$section.height();
        var start = sectionOffsetTop;
        var end = sectionOffsetTop + sectionHeight;
        this.nodes.each(function(d) {
            if (!this.view) {
                return;
            }
            this.view.handleResize({
                width: (4 + Math.floor(d.samples / 2)),
                height: v.graphHeight,
                start: start,
                end: end
            });
        });
        this.rr = true;
    },
    render: function() {
        var v = this;
        this.svg.attr("width", this.width).attr("height", this.height);
        this.nodes.each(function(d) {
            d3.select(this).attr("transform", function() {
                var x = v.x_scale(d.x);
                var y = v.y_scale(d.y);
                return "translate(" + x + "," + y + ")";
            });
        });
        this.links.each(function(link) {
            d3.select(this).attr("d", function() {
                var x1 = v.x_scale(link.source.x);
                var y1 = v.y_scale(link.source.y);
                var x2 = v.x_scale(link.target.x);
                var y2 = v.y_scale(link.target.y);
                var lineTop = v.graphHeight + y1 + 3;
                var d = "M " + x1 + " " + lineTop + " ";
                d += "L " + x2 + " " + lineTop + " ";
                d += "L " + x2 + " " + y2 + " ";
                return d;
            });
        });
    },
})
var TreeNodeView = Backbone.View.extend({
    initialize: function(args) {
        this.cid = this.cid + "TreeNodeView";
        var v = this;
        this.g = args.g;
        this.node = args.node;
        this.stats = args.stats;
        this.fixedMagnitude = args.fixedMagnitude;
        this.depth = args.depth;
        this.maxDepth = args.maxDepth;
        this.links = args.links;
        this.histogram = d3.select(this.g).append("g").attr("class", "tree_histogram");
        this.histogram.each(function() {
            this.view = new HousingAxisHistogram({
                g: this,
                data: v.stats.data,
                key: v.stats.attribute,
                split: parseFloat(v.stats.split_point)
            });
            this.view.fixedMagnitude = v.fixedMagnitude;
        });
        this.pieChartLayer = d3.select(this.g).append("g").attr("class", "tree_pie").attr("opacity", 0);
        this.pieChartLayer.append("path").attr("fill", "none").attr("stroke", "#dddddd");
        this.pieChart = new TreePieView({
            g: this.pieChartLayer,
            data: {
                total: this.stats.data.length,
                parts: [{
                    key: "isTarget",
                    count: this.stats.data_rows['true'].length
                }, {
                    key: "isNotTarget",
                    count: this.stats.data_rows['false'].length
                }]
            },
            key: v.stats.attribute,
            total_data_count: tree_training_set.length
        });
        this.verticalOffsetThreshold = function(scroll) {
            return 0;
        }
        this.verticalOffset = 0;
        this.label = d3.select(this.g).append("text").attr("font-size", 10).attr("fill", "#555555").attr("text-anchor", "middle");
        this.listenTo(Dispatcher, "scroll", this.handleScroll);
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        var v = this;
        this.width = args.width;
        this.height = args.height;
        this.start = args.start;
        this.end = args.end;
        var windowHeight = $window.height();
        this.histogram.each(function() {
            this.view.handleResize({
                width: v.width,
                height: v.height,
                barWidth: 2,
                barGap: 1
            });
        });
        var pre = this.start - windowHeight * 1;
        var start = this.start - windowHeight * 0.5;
        if (this.depth === 0) {
            pre -= windowHeight * 1.1;
            start -= windowHeight * 1.1;
        }
        if (this.depth === 1) {
            pre -= windowHeight * 0.5;
            start -= windowHeight * 0.5;
        }
        var end = this.end - windowHeight * 1;
        var after = end + 1;
        var vunit = (end - start - windowHeight * 0.4) / (this.maxDepth + 1);
        var h1 = start + vunit * this.node.depth;
        var h2 = h1 + vunit;
        var domain = [pre, start, h1, h2, end, after]
        this.histogramOpacityThreshold = d3.scale.threshold().domain(domain).range([0, 0, 0, 0, 1, 1, 0.3]);
        var pieFading = 0;
        var pieCenterOffset = windowHeight * 0.4 / this.maxDepth;
        if (!this.links) {
            pieFading = 1;
            var distanceToGo = (this.maxDepth - this.depth) * (windowHeight * 0.45) / this.maxDepth;
            this.verticalOffsetThreshold = d3.scale.linear().domain([h1, end]).range([pieCenterOffset, distanceToGo + pieCenterOffset]);
        } else {
            this.verticalOffsetThreshold = function(scroll) {
                return pieCenterOffset;
            }
        }
        this.pieOpacityThreshold = d3.scale.threshold().domain(domain).range([0, 0, 0, 1, pieFading, pieFading, pieFading]);
        this.pieChart.handleResize({
            maxRadius: this.height
        });
        this.label.attr('y', v.height + 22);
        this.rr = true;
    },
    handleScroll: function(scroll) {
        var newHistogramOpacity = this.histogramOpacityThreshold(scroll);
        var newPieOpacity = this.pieOpacityThreshold(scroll);
        var newVerticalOffset = this.verticalOffsetThreshold(scroll);
        if (this.histogramOpacity != newHistogramOpacity || this.verticalOffset != newVerticalOffset || this.pieOpacity != newPieOpacity) {
            this.histogramOpacity = newHistogramOpacity;
            this.pieOpacity = newPieOpacity;
            this.verticalOffset = newVerticalOffset;
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.histogram.attr("transform", "translate(" + (-this.width / 2) + ",0)").attr("opacity", this.histogramOpacity);
        this.pieChartLayer.attr("opacity", this.pieOpacity).attr("transform", "translate(0," + this.verticalOffset + ")");
        this.pieChartLayer.select("path").attr("opacity", this.histogramOpacity).attr("d", function() {
            var x1 = 0;
            var y1 = 0;
            var x2 = 0;
            var y2 = -v.verticalOffset;
            var d = "M " + x1 + " " + y1 + " ";
            d += "L " + x2 + " " + y2 + " ";
            return d;
        });
        if (this.stats.attribute) {
            this.label.text(DIMENSION_LONGFORM[this.stats.attribute][LANG]).attr("opacity", this.histogramOpacity);
        }
        if (this.links) {
            d3.selectAll(this.links).attr("opacity", this.histogramOpacity);
        }
    }
});
var TreePieView = Backbone.View.extend({
    initialize: function(args) {
        this.data = args.data;
        this.current = this.data;
        this.key = args.key;
        this.total_data_count = args.total_data_count
        this.g = args.g;
        this.maxRadius = 50;
        this.computeGeometry();
        this.pie = d3.layout.pie().sort(null).value(function(d) {
            return d.count;
        });
        this.slices = this.g.selectAll(".arc").data(this.pie(this.data.parts)).enter().append("g").attr("class", "arc");
        this.slices.each(function(d) {
            d3.select(this).append("path");
        });
        this.rr = true;
        R2D3Views.push(this);
    },
    computeGeometry: function() {
        this.maxArea = this.maxRadius * this.maxRadius * Math.PI;
        this.area = this.maxArea / this.total_data_count * parseInt(this.data.total);
        var newRadius = Math.sqrt(this.area / Math.PI);
        if (this.radius != newRadius) {
            this.radius = newRadius;
            this.arc = d3.svg.arc().outerRadius(this.radius).innerRadius(0);
            return true;
        } else {
            return false;
        }
    },
    handleResize: function(args) {
        if (this.maxRadius != args.maxRadius) {
            this.maxRadius = args.maxRadius;
            this.computeGeometry();
            this.rr = true;
        }
    },
    render: function() {
        var v = this;
        this.slices.each(function(d) {
            d3.select(this).select("path").attr("d", v.arc).style("fill", function(d) {
                return FILL_FN(d.data.key);
            });
        });
    }
});
var ClassifierResultsView = Backbone.View.extend({
    initialize: function(args) {
        _.extend(this, args);
        this.scroll = 0;
        this.largeTextSize = 26;
        this.smallTextSize = 22;
        this.labelVerticalOffset = -this.largeTextSize - 10;
        this.trainingGroup = this.g.append('g');
        this.trainingLine = this.trainingGroup.append('rect').attr('width', 300).attr('height', 1).attr('fill', '#aaaaaa');
        this.trainingLabel = this.trainingGroup.append('text').text(trainingAccuracyText(LANG)).attr('text-anchor', 'middle').attr('font-size', 9).attr('y', this.labelVerticalOffset).attr('x', 300);
        this.testGroup = this.g.append('g').attr('opacity', 0);
        this.testLine = this.testGroup.append('rect').attr('width', 300).attr('height', 1).attr('fill', '#aaaaaa');
        this.testLabel = this.testGroup.append('text').text(testAccuracyText(LANG)).attr('text-anchor', 'middle').attr('font-size', 9).attr('y', this.labelVerticalOffset).attr('x', 300);
        this.testOpacity = 0;
        this.opacityInterpolator = d3.scale.linear().domain([100000, 100100]).range([0, 1]).clamp(true);
        this.results = {
            train: {
                isTarget: {},
                isNotTarget: {}
            },
            test: {
                isTarget: {},
                isNotTarget: {}
            }
        }
        this.textNodes = {
            train: {
                isTarget: {
                    correct: this.trainingGroup.append('text'),
                    total: this.trainingGroup.append('text')
                },
                isNotTarget: {
                    correct: this.trainingGroup.append('text'),
                    total: this.trainingGroup.append('text')
                },
                accuracy: this.trainingGroup.append('text')
            },
            test: {
                isTarget: {
                    correct: this.testGroup.append('text'),
                    total: this.testGroup.append('text')
                },
                isNotTarget: {
                    correct: this.testGroup.append('text'),
                    total: this.testGroup.append('text')
                },
                accuracy: this.testGroup.append('text')
            }
        }
        this.largeTextNodes = [];
        this.smallTextNodes = [];
        var verticalOffset = -8;
        this.textNodes.train.accuracy.text('0').attr('text-anchor', 'middle').attr('y', verticalOffset).attr('font-size', 26).attr('fill', "#333333");
        this.trainingTargetDivider = this.trainingGroup.append('text').text('/').attr('text-anchor', 'middle').attr('y', verticalOffset).attr('font-size', 22)
        this.trainingNotTargetDivider = this.trainingGroup.append('text').text('/').attr('text-anchor', 'middle').attr('y', verticalOffset).attr('font-size', 22)
        this.textNodes.train.isTarget.correct.text('0').attr('text-anchor', 'end').attr('fill', FILL_FN(true)).attr('y', verticalOffset).attr('font-size', 22)
        this.textNodes.train.isTarget.total.text('0').attr('text-anchor', 'start').attr('fill', FILL_FN(true)).attr('y', verticalOffset).attr('font-size', 22)
        this.textNodes.train.isNotTarget.correct.text('0').attr('text-anchor', 'end').attr('fill', FILL_FN(false)).attr('y', verticalOffset).attr('font-size', 22)
        this.textNodes.train.isNotTarget.total.text('0').attr('text-anchor', 'start').attr('fill', FILL_FN(false)).attr('y', verticalOffset).attr('font-size', 22)
        this.largeTextNodes.push(this.textNodes.train.accuracy);
        this.smallTextNodes.push(this.trainingTargetDivider);
        this.smallTextNodes.push(this.trainingNotTargetDivider);
        this.smallTextNodes.push(this.textNodes.train.isTarget.correct);
        this.smallTextNodes.push(this.textNodes.train.isTarget.total);
        this.smallTextNodes.push(this.textNodes.train.isNotTarget.correct);
        this.smallTextNodes.push(this.textNodes.train.isNotTarget.total);
        this.textNodes.test.accuracy.text('0').attr('text-anchor', 'middle').attr('y', verticalOffset).attr('font-size', 26).attr('fill', "#333333");
        this.testTargetDivider = this.testGroup.append('text').text('/').attr('text-anchor', 'middle').attr('y', verticalOffset).attr('font-size', 22);
        this.testNotTargetDivider = this.testGroup.append('text').text('/').attr('text-anchor', 'middle').attr('y', verticalOffset).attr('font-size', 22);
        this.textNodes.test.isTarget.correct.text('0').attr('text-anchor', 'end').attr('fill', FILL_FN(true)).attr('y', verticalOffset).attr('font-size', 22);
        this.textNodes.test.isTarget.total.text('0').attr('text-anchor', 'start').attr('fill', FILL_FN(true)).attr('y', verticalOffset).attr('font-size', 22);
        this.textNodes.test.isNotTarget.correct.text('0').attr('text-anchor', 'end').attr('fill', FILL_FN(false)).attr('y', verticalOffset).attr('font-size', 22);
        this.textNodes.test.isNotTarget.total.text('0').attr('text-anchor', 'start').attr('fill', FILL_FN(false)).attr('y', verticalOffset).attr('font-size', 22);
        this.largeTextNodes.push(this.textNodes.test.accuracy);
        this.smallTextNodes.push(this.testTargetDivider);
        this.smallTextNodes.push(this.testNotTargetDivider);
        this.smallTextNodes.push(this.textNodes.test.isTarget.correct);
        this.smallTextNodes.push(this.textNodes.test.isTarget.total);
        this.smallTextNodes.push(this.textNodes.test.isNotTarget.correct);
        this.smallTextNodes.push(this.textNodes.test.isNotTarget.total);
        this.listenTo(Dispatcher, 'resize', this.handleResize);
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.rr = true;
        R2D3Views.push(this);
    },
    handleResize: function(args) {
        _.extend(this, args);
        var leftAnchor = this.width * 0.37;
        var rightAnchor = this.width * 0.63;
        this.trainingGroup.attr('transform', 'translate(0, ' + this.baseline.training + ')');
        this.trainingLine.attr('width', this.width)
        this.trainingLabel.attr('x', this.width / 2);
        this.textNodes.train.accuracy.attr('x', this.width / 2);
        this.trainingTargetDivider.attr('x', rightAnchor)
        this.textNodes.train.isTarget.correct.attr('x', rightAnchor - 5);
        this.textNodes.train.isTarget.total.attr('x', rightAnchor + 5);
        this.trainingNotTargetDivider.attr('x', leftAnchor)
        this.textNodes.train.isNotTarget.correct.attr('x', leftAnchor - 5);
        this.textNodes.train.isNotTarget.total.attr('x', leftAnchor + 5);
        this.testGroup.attr('transform', 'translate(0, ' + this.baseline.test + ')');
        this.testLine.attr('width', this.width);
        this.testLabel.attr('x', this.width / 2);
        this.textNodes.test.accuracy.attr('x', this.width / 2);
        this.testTargetDivider.attr('x', rightAnchor)
        this.textNodes.test.isTarget.correct.attr('x', rightAnchor - 3);
        this.textNodes.test.isTarget.total.attr('x', rightAnchor + 3);
        this.testNotTargetDivider.attr('x', leftAnchor)
        this.textNodes.test.isNotTarget.correct.attr('x', leftAnchor - 3);
        this.textNodes.test.isNotTarget.total.attr('x', leftAnchor + 3);
        if (this.width < 800) {
            this.largeTextSize = 18;
            this.smallTextSize = 16;
        } else {
            this.largeTextSize = 26;
            this.smallTextSize = 22;
        }
        _.each(this.largeTextNodes, function(t) {
            t.attr('font-size', this.largeTextSize);
        }, this);
        _.each(this.smallTextNodes, function(t) {
            t.attr('font-size', this.smallTextSize);
        }, this);
        this.labelVerticalOffset = -this.largeTextSize - 10;
        this.testLabel.attr('y', this.labelVerticalOffset);
        this.trainingLabel.attr('y', this.labelVerticalOffset);
        var scrollDuration = $window.height() / 3;
        var testScrollStart = this.scrollExtent.test[0];
        this.opacityInterpolator.domain([testScrollStart - scrollDuration, testScrollStart]);
        this.handleScroll(this.scroll);
        this.rr = true;
    },
    updateNumber: function(setKey, targetKey, results) {
        this.rr = true;
        this.results[setKey][targetKey] = results;
    },
    handleScroll: function(scroll) {
        this.scroll = scroll;
        var newOpacity = Math.round(this.opacityInterpolator(scroll) * 100) / 100;
        if (this.testOpacity != newOpacity) {
            this.rr = true;
            this.testOpacity = newOpacity;
        }
    },
    render: function() {
        var trainAccuracy = Math.round((this.results['train']['isTarget'].correct + this.results['train']['isNotTarget'].correct) / (this.results['train']['isTarget'].total + this.results['train']['isNotTarget'].total) * 1000) / 10;
        this.textNodes.train.accuracy.text(trainAccuracy + '%');
        if (isNaN(trainAccuracy)) {
            this.textNodes.train.accuracy.attr('opacity', 0);
        } else {
            this.textNodes.train.accuracy.attr('opacity', 1);
        }
        this.textNodes.train.isTarget.correct.text(this.results['train']['isTarget'].correct);
        this.textNodes.train.isNotTarget.correct.text(this.results['train']['isNotTarget'].correct);
        this.textNodes.train.isTarget.total.text(this.results['train']['isTarget'].total);
        this.textNodes.train.isNotTarget.total.text(this.results['train']['isNotTarget'].total);
        this.testGroup.attr('opacity', this.testOpacity);
        var testAccuracy = Math.round((this.results['test']['isTarget'].correct + this.results['test']['isNotTarget'].correct) / (this.results['test']['isTarget'].total + this.results['test']['isNotTarget'].total) * 1000) / 10;
        this.textNodes.test.accuracy.text(testAccuracy + '%');
        if (isNaN(testAccuracy)) {
            this.textNodes.test.accuracy.attr('opacity', 0);
        } else {
            this.textNodes.test.accuracy.attr('opacity', 1);
        }
        this.textNodes.test.isTarget.correct.text(this.results['test']['isTarget'].correct);
        this.textNodes.test.isNotTarget.correct.text(this.results['test']['isNotTarget'].correct);
        this.textNodes.test.isTarget.total.text(this.results['test']['isTarget'].total);
        this.textNodes.test.isNotTarget.total.text(this.results['test']['isNotTarget'].total);
    }
})
var AnimatedClassifierView = Backbone.View.extend({
    setUpAbstractGeometry: function(data, stats, groupID) {
        var v = this;
        var index = [];
        var samples = _.map(data, function(sample) {
            var path = this.pathGroup.append('path');
            path.attr('stroke-width', 1).attr('stroke', FILL_FN(sample)).attr('fill', 'none').attr('opacity', 0);
            var circle = this.circleGroup.append('circle');
            circle.on('mouseenter', function() {
                v.sampleID = sample.index;
                v.rr = true;
            }).on('mouseleave', function() {
                v.sampleID = null;
                v.rr = true;
            }).attr('fill', FILL_FN(sample)).attr('stroke-width', 1).attr('stroke', FILL_FN(sample)).attr('r', this.ballRadius);
            index.push(sample.index);
            return {
                groupID: groupID,
                attributes: sample,
                waypoints: [],
                treeCoordinates: [],
                path: path,
                circle: circle,
                x: 0,
                y: 0
            }
        }, this);
        _.each(stats, function(node) {
            _.each(node.data, function(sampleInNode) {
                var trainingKey = index.indexOf(sampleInNode.index);
                if (trainingKey >= 0) {
                    var coordinates = {
                        x: this.tree.nodes[parseInt(node.node)].x,
                        y: this.tree.nodes[parseInt(node.node)].y
                    }
                    samples[trainingKey].waypoints.push(node.node);
                    samples[trainingKey].treeCoordinates.push(coordinates);
                }
            }, this);
        }, this);
        _.each(samples, function(s) {
            var lastNode = parseInt(s.waypoints[s.waypoints.length - 1]);
            var classification = this.training_stats[lastNode].mix.classification;
            s.classification = classification;
            if (s.attributes.target > 0.5) {
                s.correctlyClassified = (s.classification === "isTarget");
            } else {
                s.correctlyClassified = (s.classification === "isNotTarget");
            }
            if (!s.correctlyClassified) {
                s.circle.attr('fill', 'none');
            }
        }, this);
        samples = _.shuffle(samples);
        var setSize = samples.length;
        var classifiedSamples = _.partition(samples, function(s) {
            return s.classification == "isTarget"
        });
        var asTargetSize = classifiedSamples[0].length;
        var asNotTargetSize = classifiedSamples[1].length;
        var numberOfRows = 5;
        var asTargetCorrect = 0;
        var asTargetIncorrect = 0;
        _.each(classifiedSamples[0], function(s) {
            var numberOfColumns = Math.ceil(asTargetSize / numberOfRows);
            var order = asTargetCorrect;
            if (s.correctlyClassified) {
                asTargetCorrect++;
            } else {
                order = asTargetSize - asTargetIncorrect - 1;
                asTargetIncorrect++;
            }
            var column = order % numberOfRows;
            var row = Math.floor(order / numberOfRows);
            s.pileCoordinates = {
                row: row,
                col: column
            }
        });
        var asNotTargetCorrect = 0;
        var asNotTargetIncorrect = 0;
        _.each(classifiedSamples[1], function(s) {
            var numberOfColumns = Math.ceil(asNotTargetSize / numberOfRows);
            var order = asNotTargetCorrect;
            if (s.correctlyClassified) {
                asNotTargetCorrect++;
            } else {
                order = asNotTargetSize - asNotTargetIncorrect - 1;
                asNotTargetIncorrect++;
            }
            var column = order % numberOfRows;
            var row = Math.floor(order / numberOfRows);
            s.pileCoordinates = {
                row: row,
                col: column
            }
        });
        return samples;
    },
    initialize: function(args) {
        var v = this;
        _.extend(this, args);
        this.paddingRight = 20;
        this.ballRadius = 3;
        this.ballSpacing = this.ballRadius + 5;
        this.labelOffset = 30;
        this.svg = this.el.append('svg');
        this.pathGroup = this.svg.append('g');
        this.circleGroup = this.svg.append('g');
        this.labelsGroup = this.svg.append('g');
        this.hoverGroup = this.svg.append('g');
        this.resultsGroup = this.svg.append('g');
        this.resultsView = new ClassifierResultsView({
            g: v.resultsGroup
        });
        this.trainingSection = $('#classify-training-data');
        this.testSection = $('#classify-test-data');
        this.trainingSamples = [];
        this.testSamples = [];
        this.splitLabels = [];
        this.sampleIndex = [];
        this.tree = ParseGeometryFromTreeData(this.treeData);
        this.trainingSamples = this.setUpAbstractGeometry(this.training, this.training_stats, 'train');
        this.testSamples = this.setUpAbstractGeometry(this.test, this.test_stats, 'test');
        _.each(this.tree.nodes, function(node) {
            var labelLayer = this.labelsGroup.append('g');
            var overlayLayer = labelLayer.append('g');
            var textLayer = overlayLayer.append('g');
            var hoverLayer = this.hoverGroup.append('g');
            if (node.key) {
                var attributeTranslated = DIMENSION_LONGFORM[node.key][LANG];
                var unit = DIMENSION_UNITS[node.key].suffix;
                var attributeValue = UNIT_CONVERSION(node.value, unit, LANG);
            } else {
                var attributeTranslated = '';
                var attributeValue = '';
            }
            var leftText = textLayer.append('text');
            leftText.attr('text-anchor', 'end').attr('x', -this.ballSpacing * 2).attr('font-size', 11).attr('y', 26).text(attributeTranslated + " <= " + attributeValue);
            var rightText = textLayer.append('text');
            rightText.attr('x', this.ballSpacing * 2).attr('font-size', 11).attr('y', 26).text(attributeTranslated + " > " + attributeValue);
            var leftArrow = labelLayer.append('g');
            var rightArrow = labelLayer.append('g');
            var leftLine = leftArrow.append('path').attr('fill', 'none').attr('stroke-width', 1);
            var rightLine = rightArrow.append('path').attr('fill', 'none').attr('stroke-width', 1);
            var leftLeaf = labelLayer.append('rect').attr('opacity', 0);
            var rightLeaf = labelLayer.append('rect').attr('opacity', 0);
            if (node.children) {
                var leftHover = hoverLayer.append('rect').classed('leftHover', true).attr('x', -60).attr('width', 60).attr('y', this.labelOffset * 0.6).attr('height', 60).attr('opacity', 0).on('mouseenter', function() {
                    v.splitID = node.children[0].id;
                    v.rr = true;
                }).on('mouseleave', function() {
                    v.splitID = null;
                    v.rr = true;
                })
                var rightHover = hoverLayer.append('rect').classed('rightHover', true).attr('x', 0).attr('width', 60).attr('y', this.labelOffset * 0.6).attr('height', 60).attr('opacity', 0).on('mouseenter', function() {
                    v.splitID = node.children[1].id;
                    v.rr = true;
                }).on('mouseleave', function() {
                    v.splitID = null;
                    v.rr = true;
                })
            }
            this.splitLabels.push({
                node: node,
                layer: labelLayer,
                overlayLayer: overlayLayer,
                hoverLayer: hoverLayer,
                leftHover: leftHover,
                rightHover: rightHover,
                leftArrow: leftArrow,
                rightArrow: rightArrow,
                leftLine: leftLine,
                rightLine: rightLine,
                leftLeaf: leftLeaf,
                rightLeaf: rightLeaf,
                leftText: leftText,
                rightText: rightText
            });
        }, this)
        this.handleResize();
        this.listenTo(Dispatcher, 'resize', this.handleResize);
        this.listenTo(Dispatcher, 'scroll', this.handleScroll);
        this.sampleID = null;
        this.splitID = null;
        this.rr = true;
        R2D3Views.push(this);
    },
    updateSamplePath: function(s, si) {
        var pathString = 'M ' + this.funnelStart.x + ' ' + this.funnelStart.y + ' ';
        var px = 0;
        _.each(s.treeCoordinates, function(p, i) {
            px = this.treeScales.x(p.x);
            pathString += 'L ' + this.treeScales.x(p.x) + ' ' + this.treeScales.y(p.y) + ' ';
            pathString += 'L ' + this.treeScales.x(p.x) + ' ' + (this.treeScales.y(p.y) + this.labelOffset) + ' ';
        }, this);
        pathString += 'L ' + px + ' ' + this.treeScales.y(1.1) + ' ';
        var baseline = this.baseline.training;
        if (s.groupID === "test") {
            baseline = this.baseline.test;
        }
        if (s.classification === "isTarget") {
            pathString += 'L ' + this.treeScales.x(0.75) + ' ' + this.treeScales.y(1.2) + ' ';
            var x = this.treeScales.x(1.05) + s.pileCoordinates.row * this.ballSpacing * -1 + (-this.ballSpacing / 2 * s.pileCoordinates.col);
            var y = s.pileCoordinates.col * this.ballSpacing * -0.86 + baseline;
            pathString += 'L ' + x + ' ' + y + ' ';
        } else {
            pathString += 'L ' + this.treeScales.x(0.25) + ' ' + this.treeScales.y(1.2) + ' ';
            var x = this.treeScales.x(0.02) + s.pileCoordinates.row * this.ballSpacing + (this.ballSpacing / 2 * s.pileCoordinates.col);
            var y = s.pileCoordinates.col * this.ballSpacing * -0.86 + baseline;
            pathString += 'L ' + x + ' ' + y + ' ';
        }
        s.path.attr('d', pathString);
        s.pathLength = s.path.node().getTotalLength();
    },
    handleResize: function() {
        this.bounds = this.el.node().getBoundingClientRect();
        this.offsetTop = $(this.el.node()).offset().top;
        var windowHeight = $window.height();
        if (this.bounds.width > 850) {
            this.ballRadius = 3;
            this.ballSpacing = this.ballRadius + 5;
        } else {
            if (this.bounds.width > 650) {
                this.ballRadius = 2;
                this.ballSpacing = this.ballRadius + 4;
            } else {
                this.ballRadius = 1.5;
                this.ballSpacing = this.ballRadius + 3;
            }
        }
        _.each(this.trainingSamples, function(s) {
            s.circle.attr('r', this.ballRadius);
        }, this);
        _.each(this.testSamples, function(s) {
            s.circle.attr('r', this.ballRadius);
        }, this);
        this.svg.attr('width', this.bounds.width - this.paddingRight).attr('height', this.bounds.height);
        var treeExtent = {
            x: [0, this.bounds.width - this.paddingRight - 40],
            y: [this.bounds.height * 0.05 + this.ballSpacing, this.bounds.height * 0.60]
        }
        this.treeScales = {
            x: d3.scale.linear().domain([0, 1]).range(treeExtent.x),
            y: d3.scale.linear().domain([0, 1]).range(treeExtent.y)
        }
        this.funnelStart = {
            x: this.treeScales.x(this.tree.nodes[0].x),
            y: this.bounds.height * 0.05
        }
        this.targetCount = {
            train: 0,
            test: 0
        }
        this.notTargetCount = {
            train: 0,
            test: 0
        }
        _.each(this.splitLabels, function(l) {
            var x = this.treeScales.x(l.node.x);
            var y = this.treeScales.y(l.node.y);
            if (!l.node.children) {
                l.overlayLayer.attr('style', 'display: none;');
            } else {
                l.hoverLayer.attr('transform', 'translate(' + x + ', ' + y + ')');
                l.overlayLayer.attr('transform', 'translate(' + x + ', ' + y + ')');
                var hoverWidth = x - this.treeScales.x(l.node.children[0].x);
                var hoverHeight = this.treeScales.y(l.node.children[0].y) - y;
                l.leftHover.attr('fill', 'transparent').attr('opacity', 1).attr('x', -hoverWidth).attr('y', hoverHeight * 0.3).attr('width', hoverWidth).attr('height', hoverHeight)
                l.rightHover.attr('fill', 'transparent').attr('opacity', 1).attr('y', hoverHeight * 0.3).attr('width', hoverWidth).attr('height', hoverHeight)
                var midY = (this.treeScales.y(l.node.y) + this.labelOffset + this.ballSpacing);
                var dx0 = x - this.treeScales.x(l.node.children[0].x);
                var dx1 = x - this.treeScales.x(l.node.children[1].x);
                var dy = midY - (this.treeScales.y(l.node.children[0].y) + this.ballSpacing);
                var lineLength = Math.sqrt(dy * dy + dx0 * dx0);
                var newLineLength = lineLength - this.ballSpacing;
                var theta0 = Math.atan(dy / dx0) + Math.PI;
                var theta1 = Math.atan(dy / dx1);
                var nx0 = x + Math.cos(theta0) * newLineLength;
                var nx1 = x + Math.cos(theta1) * newLineLength;
                var ny0 = midY + Math.sin(theta0) * newLineLength;
                var ny1 = midY + Math.sin(theta1) * newLineLength;
                var leftD = '';
                leftD += 'M ' + x + ' ' + (y + this.labelOffset + this.ballSpacing) + ' ';
                leftD += 'L ' + nx0 + ' ' + ny0 + ' ';
                leftD += 'L ' + nx0 + ' ' + (this.treeScales.y(l.node.children[0].y) + this.labelOffset - this.ballSpacing) + ' ';
                l.leftLine.attr('d', leftD);
                var rightD = '';
                rightD += 'M ' + x + ' ' + (y + this.labelOffset + this.ballSpacing) + ' ';
                rightD += 'L ' + nx1 + ' ' + ny1 + ' ';
                rightD += 'L ' + nx1 + ' ' + (this.treeScales.y(l.node.children[0].y) + this.labelOffset - this.ballSpacing) + ' ';
                l.rightLine.attr('d', rightD);
                if (!l.node.children[0].children) {
                    var color = FILL_FN("isTarget");
                    if (l.node.children[0].value[0] > l.node.children[0].value[1]) {
                        color = FILL_FN("isNotTarget");
                    }
                    l.leftLeaf.attr('opacity', 1).attr('x', nx0 - 1).attr('y', ny0 + 14).attr('fill', color).attr('width', 2).attr('height', 10);
                }
                if (!l.node.children[1].children) {
                    var color = FILL_FN("isTarget");
                    if (l.node.children[1].value[0] > l.node.children[1].value[1]) {
                        color = FILL_FN("isNotTarget");
                    }
                    l.rightLeaf.attr('opacity', 1).attr('x', nx1 - 1).attr('y', ny1 + 14).attr('fill', color).attr('width', 2).attr('height', 10);
                }
            }
        }, this);
        this.baseline = {};
        this.baseline.training = this.bounds.height * 0.93;
        this.baseline.test = this.baseline.training - this.ballSpacing * 9;
        _.each(this.trainingSamples, this.updateSamplePath, this);
        _.each(this.testSamples, this.updateSamplePath, this);
        var trainingTop = this.trainingSection.offset().top;
        var trainingStart = trainingTop - windowHeight * 0.3;
        var trainingEnd = trainingTop + windowHeight * 1.2;
        var testStart = this.testSection.offset().top;
        var testEnd = testStart + windowHeight * 1.5;
        var ballDurationInPixels = Math.round(windowHeight / 4);
        var trainingInterval = Math.floor((trainingEnd - trainingStart - ballDurationInPixels) / this.trainingSamples.length);
        var testInterval = Math.floor((testEnd - testStart - ballDurationInPixels) / this.testSamples.length);
        _.each(this.trainingSamples, function(s, si) {
            var start = trainingStart + si * trainingInterval;
            var end = trainingStart + ballDurationInPixels;
            s.scrollExtent = [start, end];
            s.scrollDuration = ballDurationInPixels;
        });
        _.each(this.testSamples, function(s, si) {
            var start = testStart + si * testInterval;
            var end = testStart + ballDurationInPixels;
            s.scrollExtent = [start, end];
            s.scrollDuration = ballDurationInPixels;
        });
        this.resultsView.handleResize({
            width: this.bounds.width,
            baseline: {
                training: this.baseline.training + this.ballSpacing,
                test: this.baseline.test + this.ballSpacing
            },
            scrollExtent: {
                training: [trainingStart, trainingEnd],
                test: [testStart, testEnd],
            }
        });
        this.rr = true;
    },
    updatePointPosition: function(sample, scroll) {
        var progress = (scroll - sample.scrollExtent[0]) * 4;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > sample.pathLength) {
            progress = sample.pathLength;
            sample.done = true;
        } else {
            sample.done = false;
        }
        var point = sample.path.node().getPointAtLength(progress);
        if (sample.x != point.x || sample.y != point.y) {
            sample.x = point.x;
            sample.y = point.y;
            sample.rr = true;
            return true;
        } else {
            return false;
        }
    },
    handleScroll: function(scroll) {
        var percentages = {
            train: {
                isTarget: {
                    correct: 0,
                    total: 0
                },
                isNotTarget: {
                    correct: 0,
                    total: 0
                }
            },
            test: {
                isTarget: {
                    correct: 0,
                    total: 0
                },
                isNotTarget: {
                    correct: 0,
                    total: 0
                }
            }
        }
        this.trainingSamples.forEach(function(sample) {
            this.rr = this.updatePointPosition(sample, scroll) || this.rr;
            if (sample.done) {
                percentages.train[sample.classification].total++;
                if (sample.correctlyClassified) {
                    percentages.train[sample.classification].correct++;
                }
            }
        }, this);
        this.testSamples.forEach(function(sample) {
            this.rr = this.updatePointPosition(sample, scroll) || this.rr;
            if (sample.done) {
                percentages.test[sample.classification].total++;
                if (sample.correctlyClassified) {
                    percentages.test[sample.classification].correct++;
                }
            }
        }, this);
        _.each(['train', 'test'], function(set) {
            _.each(['isTarget', 'isNotTarget'], function(target) {
                if (percentages[set][target].total > 0) {
                    percentages[set][target].percent = Math.round(percentages[set][target].correct / percentages[set][target].total * 100);
                } else {
                    percentages[set][target].percent = 0;
                }
                this.resultsView.updateNumber(set, target, percentages[set][target]);
            }, this)
        }, this);
    },
    renderSamples: function(sample) {
        if (sample.rr) {
            sample.circle.attr('cx', sample.x).attr('cy', sample.y);
        }
        if (this.sampleID) {
            if (this.sampleID == sample.attributes.index && sample.path.attr('opacity') <= 0) {
                sample.path.attr('opacity', 1).attr('style', 'display: initial');
            }
            if (this.sampleID != sample.attributes.index && sample.path.attr('opacity') > 0) {
                sample.path.attr('opacity', 0).attr('style', 'display: none');
            }
        } else {
            if (this.splitID) {
                if (sample.waypoints.indexOf(this.splitID) >= 0) {
                    sample.path.attr('opacity', 0.1).attr('style', 'display: initial');
                } else {
                    sample.path.attr('opacity', 0).attr('style', 'display: none');
                }
            }
        }
        if (!this.sampleID && !this.splitID) {
            sample.path.attr('opacity', 0).attr('style', 'display: none');
        }
    },
    render: function() {
        this.trainingSamples.forEach(this.renderSamples, this);
        this.testSamples.forEach(this.renderSamples, this);
        this.splitLabels.forEach(function(s) {
            if (this.splitID) {
                if (s.node.children) {
                    if (this.splitID == s.node.children[0].id) {
                        s.leftText.attr('style', 'display: block;');
                        s.leftLine.attr('stroke', '#333333').attr('stroke-width', 2);
                    } else {
                        s.leftText.attr('style', 'display: none;');
                        s.leftLine.attr('stroke', '#bbbbbb').attr('stroke-width', 1);;
                    }
                    if (this.splitID == s.node.children[1].id) {
                        s.rightText.attr('style', 'display: block;');
                        s.rightLine.attr('stroke', '#333333').attr('stroke-width', 2);;
                    } else {
                        s.rightText.attr('style', 'display: none;');
                        s.rightLine.attr('stroke', '#bbbbbb').attr('stroke-width', 1);;
                    }
                }
            } else {
                s.rightText.attr('style', 'display: none;');
                s.leftText.attr('style', 'display: none;');
                s.leftLine.attr('stroke', '#bbbbbb').attr('stroke-width', 1);
                s.rightLine.attr('stroke', '#bbbbbb').attr('stroke-width', 1);
            }
        }, this)
    }
})
var Analytics = function() {
    var Analytics = {};
    Analytics.threshold = d3.scale.threshold();
    Analytics.currentSection = null;
    Analytics.sectionIDs = [];
    Analytics.sectionEnds = [];
    Analytics.sections = $('.tracking-section');
    Analytics.sections.each(function() {
        Analytics.sectionIDs.push($(this).attr('id'));
    });
    Analytics.handleResize = function() {
        this.sectionEnds = [];
        var a = this;
        this.sections.each(function() {
            var top = $(this).offset().top;
            var height = $(this).height();
            a.sectionEnds.push(top + height);
        });
        this.threshold.domain(this.sectionEnds).range(this.sectionIDs);
    }
    Analytics.handleResize();
    Analytics.handleScroll = function(scroll) {
        var section = this.threshold(scroll);
        this.pixelDepth = scroll;
        this.percentDepth = scroll / this.scrollMax * 100;
        if (this.currentSection != section) {
            ga("send", "event", "decision_tree_part_1", "scroll_section", section);
        }
        this.currentSection = section;
    }
    return Analytics;
}();
_.extend(Analytics, Backbone.Events);
Analytics.listenTo(Dispatcher, 'scroll', Analytics.handleScroll);
Analytics.listenTo(Dispatcher, 'resize', Analytics.handleResize);
var ScrollHint = new ScrollHinterView({
    el: d3.select('#keep-scrolling'),
    child: d3.select('#animated-arrow')
});
var IntroScatterPlot = new HousingScatterPlotMatrixCanvas({
    el: d3.select("#intro-scatterplot"),
    dimensionsArray: DIMENSIONS,
    data: {
        points: tree_training_set
    }
});
var IntroScatterSticky = new StickyDivView({
    el: $("#intro-scatterplot"),
    topFn: function() {
        return 0;
    },
    bottomFn: function() {
        return $("#split").offset().top;
    }
});
var filteredData = _.map(tree_training_set, function(d) {
    var f = {};
    _.each(DIMENSIONS, function(D) {
        f[D.id] = d[D.id];
    });
    f['city'] = "NY";
    if (d["target"] > 0.5) {
        f['city'] = "SF";
    }
    return f;
})
var IntroDataTable = new DataTableView({
    el: $("#data-table"),
    data: filteredData
});
var SplitQuality = new SplitQualityView({
    el: $("#split-quality"),
    parent: $("#split"),
    stats: tree_stats[0],
    tree: tree_data
});
var SplitQualitySticky = new StickyDivView({
    el: $("#split-quality"),
    topFn: function() {
        return $("#split").offset().top;
    },
    bottomFn: function() {
        return $("#tree").offset().top;
    }
});
var DecisionTree = new DecisionTreeView({
    el: $("#decision-tree"),
    data: {
        tree: tree_data,
        stats: tree_stats
    }
});
var DecisionTreeSticky = new StickyDivView({
    el: $("#decision-tree"),
    topFn: function() {
        return $("#tree").offset().top;
    },
    bottomFn: function() {
        return $("#test").offset().top;
    }
});
var AnimatedClassifier = new AnimatedClassifierView({
    el: d3.select("#train-vs-test"),
    treeData: tree_data,
    training: tree_training_set,
    training_stats: tree_stats,
    test: tree_test_set,
    test_stats: test_stats
})
var TestSetSticky = new StickyDivView({
    el: $("#train-vs-test"),
    topFn: function() {
        return $("#test").offset().top;
    },
    bottomFn: function() {
        return $("#conclusion").offset().top;
    }
})
Dispatcher.trigger("resize");
draw();
var footnotes = function() {
    var container = $('<div id="footnote-container"></div>');
    var body = $('body');
    container.appendTo('body').css({
        'top': 0,
        'left': 0,
        'opacity': 0
    }).on('click', function(e) {
        e.stopPropagation();
    });
    var hideContainer = function() {
        container.css({
            'top': 0,
            'left': 0,
            'opacity': 0
        });
    }
    $('#footnotes').css({
        'height': '1px',
        'overflow': 'hidden'
    });
    var bind = function() {
        $('.footnote-anchor').each(function(i) {
            $(this).html(i + 1);
            var handleClick = function(i) {
                return function(e) {
                    e.stopPropagation();
                    var content = $('#footnote-list li:eq(' + i + ')').html();
                    var bodyWidth = body.width();
                    var containerWidth = container.width();
                    var offset = $(this).offset();
                    var offsetLeft = offset.left - containerWidth / 2;
                    var minMargin = 40;
                    if (offsetLeft < minMargin) {
                        offsetLeft = minMargin;
                    }
                    if (offsetLeft > bodyWidth - minMargin - containerWidth) {
                        offsetLeft = bodyWidth - minMargin - containerWidth;
                    }
                    container.html(content).css({
                        'top': offset.top + 30 + 'px',
                        'left': offsetLeft + 'px',
                        'opacity': 1
                    });
                    body.one('click', hideContainer);
                }
            }(i)
            $(this).on('click', handleClick);
        });
    }
    bind();
    var handleResize = function() {
        body.trigger('click');
    }
    var handleScroll = function() {
        body.trigger('click');
    }
    return {
        handleResize: handleResize,
        handleScroll: handleScroll,
        bind: bind
    }
}();
Dispatcher.on('resize', footnotes.handleResize);
$window.on("scroll", function() {
    footnotes.handleScroll();
    checkScroll();
});