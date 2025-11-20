export type TicketPayloads = {
  created: { ticketId: string | number; title: string; createdBy: string | number; assignee?: string | number };
  updated: { ticketId: number; changes: Record<string, unknown>; status: string; updatedBy?: string | number }
  assigned: { ticketId: number; assignee?: string | number; assignedBy?: string | number };
  resolved: { ticketId: number; resolvedBy?: string | number };
  comment: { ticketId: number; commentId: string; text: string; author: string | number };
  statusChanged: { ticketId: number; from: string; to: string; changedBy?: string };
};

export type SubscriptionPayloads = {
  started: { userId: string; plan: string; startedAt: number };
  upgraded: { userId: string; fromPlan: string; toPlan: string; at: number };
  downgraded: { userId: string; fromPlan: string; toPlan: string; at: number };
  paymentFailed: { userId: string; attemptId?: string; reason?: string; at: number };
  trialEnding: { userId: string; daysLeft: number; at: number };
  renewalUpcoming: { userId: string; plan: string; renewDate: string };
};

export type AuthPayloads = {
  login: { email: string; ip?: string; device?: string; at: number };
  newDevice: { email: string; device: string; ip?: string; at: number };
  roleChanged: { email: string; fromRole: string; toRole: string; changedBy?: string; at: number };
  invited: { email: string; invitedBy?: string; inviteId?: string; at: number };
  removed: { email: string; removedBy?: string; at: number };
};

export type AppEvents = {
  "ticket:created": TicketPayloads["created"];
  "ticket:updated": TicketPayloads["updated"];
  "ticket:assigned": TicketPayloads["assigned"];
  "ticket:resolved": TicketPayloads["resolved"];
  "ticket:comment": TicketPayloads["comment"];
  "ticket:status-changed": TicketPayloads["statusChanged"];

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
