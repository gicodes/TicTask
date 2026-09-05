export 
  function getExpiryDate(
    billingCycle?: string,
    from = new Date(),
  ): Date {
    const days =
      billingCycle === "monthly"
        ? 30
        : billingCycle === "annually" || billingCycle === "anually"
          ? 360
          : 14;

    const expiryDate = new Date(from);
    expiryDate.setDate(expiryDate.getDate() + days);

    return expiryDate;
  }