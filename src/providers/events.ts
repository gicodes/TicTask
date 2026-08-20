import { 
  TicketPayloads, 
  TeamTicketPayloads, 
  SubscriptionPayloads, 
  AuthPayloads 
} from "@/types/events";

export type AppEvents = {
  "ticket:created": TicketPayloads["created"];
  "ticket:assigned": TicketPayloads["assigned"];
  "ticket:updated": TicketPayloads["updated"];
  "ticket:due_soon": TicketPayloads["due_soon"];
  "ticket:resolved": TicketPayloads["resolved"];
  "ticket:closed": TicketPayloads["closed"];
  "ticket:comment": TicketPayloads["comment"];
  "ticket:status-changed": TicketPayloads["statusChanged"];
  
  "team:ticket:due_soon": TeamTicketPayloads["due_soon"];
  "team:ticket:created": TeamTicketPayloads["created"];
  "team:ticket:updated": TeamTicketPayloads["updated"];
  "team:ticket:deleted": TeamTicketPayloads["deleted"];
  "team:ticket:comment": TeamTicketPayloads["comment"];
  "team:ticket:closed": TeamTicketPayloads["closed"];
  "team:ticket:assigned": TeamTicketPayloads["assigned"];
  "team:ticket:resolved": TeamTicketPayloads["resolved"];
  "team:ticket:status-changed": TicketPayloads["statusChanged"];

  "subscription:started": SubscriptionPayloads["started"];
  "subscription:upgraded": SubscriptionPayloads["upgraded"];
  "subscription:downgraded": SubscriptionPayloads["downgraded"];
  "subscription:payment-failed": SubscriptionPayloads["paymentFailed"];
  "subscription:trial-ending": SubscriptionPayloads["trialEnding"];
  "subscription:renewal-upcoming": SubscriptionPayloads["renewalUpcoming"];

  "auth:login": AuthPayloads["login"];
  "auth:new-device": AuthPayloads["newDevice"];
  "auth:role-changed": AuthPayloads["roleChanged"];
  "auth:invited": AuthPayloads["invited"];
  "auth:removed": AuthPayloads["removed"];
};

type Handler<T> = (payload: T) => void;

class TypedEmitter<E extends Record<string, unknown>> {
  private handlers: Partial<{ [K in keyof E]: Handler<E[K]>[] }> = {};

  on<K extends keyof E>(event: K, handler: Handler<E[K]>) {
    this.handlers[event] = this.handlers[event] || [];
    (this.handlers[event] as Handler<E[K]>[]).push(handler);
    return () => this.off(event, handler);
  }

  off<K extends keyof E>(event: K, handler?: Handler<E[K]>) {
    if (!this.handlers[event]) return;
    if (!handler) {
      delete this.handlers[event];
      return;
    }
    this.handlers[event] = (this.handlers[event] as Handler<E[K]>[]).filter(
      (h) => h !== handler
    );
  }

  emit<K extends keyof E>(event: K, payload: E[K]) {
    (this.handlers[event] || []).slice().forEach((h: Handler<E[K]>) => {
      try {
        h(payload);
      } catch (err) {
        console.error("Event handler error", event, err);
      }
    });
  }
}

export const AppEvents = new TypedEmitter<AppEvents>();
