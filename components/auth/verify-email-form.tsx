"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import CardWrapper from "./card-wrapper";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { newVerification } from "@/lib/actions/new-verification";

const VerifyEmailContent = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("No token provided");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        }
        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An unexpected error occurred");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="xl:w-1/4 md:w-1/2 w-full px-10 sm:px-0">
      <CardWrapper
        headerLabel="Confirming your verification"
        title="Email Verification"
        backButtonLabel="Back to login"
        backButtonHref="/sign-in"
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && <span>Verifying...</span>}
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </CardWrapper>
    </div>
  );
};

const VerifyEmailForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailForm;
