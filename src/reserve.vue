<v-dialog activator="parent" max-width="500">
    <template #default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title>Yeni soraqça</v-card-title>
        <v-divider class="mb-4" />
        <div class="pa-4 gap-2">
          <v-text-field
            v-model="newGuideData.name"
            hide-details="auto"
            label="Soraqçanın adı"
            variant="outlined"
            color="#1C444D"
          />
          <v-text-field
            v-model="newGuideData.service"
            hide-details="auto"
            label="Operator/Xidmət"
            variant="outlined"
            class="my-4"
            color="#1C444D"
          />
          <v-text-field
            v-model="newGuideData.content"
            label="Məzmun"
            variant="outlined"
            color="#1C444D"
          />
        </div>
        <v-divider class="mt-2" />
        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn
            class="text-none"
            rounded="xl"
            text="Bağla"
            @click="isActive.value = false"
          />
          <v-btn
            class="text-none"
            color="#1F737F"
            text="Yarat"
            variant="flat"
            @click="
              () => {
                createNewGuide();
                isActive.value = false;
              }
            "
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

    <!-- View Modal -->
    <v-dialog v-model="isViewModalOpen" max-width="500">
        <v-card rounded="lg">
          <v-card-title>Soraqçanın detalları</v-card-title>
          <v-divider class="mb-4" />
          <div>
            <v-row>
              <v-col col="12" lg="6">
                <v-list-item title="Adı" />
              </v-col>
              <v-col col="12" lg="6">
                <v-list-item :subtitle="viewedGuide.name" />
              </v-col>
            </v-row>
            <v-divider class="mx-4" />
            <v-row>
              <v-col col="12" lg="6">
                <v-list-item title="Operator/xidmət" />
              </v-col>
              <v-col col="12" lg="6">
                <v-list-item :subtitle="viewedGuide.service" />
              </v-col>
            </v-row>
            <v-divider class="mx-4" />
            <v-row>
              <v-col col="12" lg="6">
                <v-list-item title="Məzmun" />
              </v-col>
              <v-col col="12" lg="6">
                <v-list-item :subtitle="viewedGuide.content" />
              </v-col>
            </v-row>
          </div>
          <v-divider class="mt-2" />
          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Dismiss"
              @click="closeViewModal"
            >
              Bağla
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
      <!-- Edit Modal -->
      <v-dialog v-model="isEditModalOpen" max-width="500">
        <v-card rounded="lg">
          <v-card-title>Soraqçanın redaktəsi</v-card-title>
          <v-divider class="mb-4" />
          <div class="pa-4 gap-2">
            <v-text-field
              v-model="editedGuide.name"
              hide-details="auto"
              label="Soraqçanın adı"
              variant="outlined"
              color="#1C444D"
            />
            <v-text-field
              v-model="editedGuide.service"
              hide-details="auto"
              label="Operator/Xidmət"
              variant="outlined"
              class="my-4"
              color="#1C444D"
            />
            <v-text-field
              v-model="editedGuide.content"
              label="Məzmun"
              variant="outlined"
              color="#1C444D"
            />
          </div>
          <v-divider class="mt-2" />
          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Dismiss"
              @click="closeEditModal"
            >
              Dismiss
            </v-btn>
            <v-btn
              class="text-none"
              color="#1F737F"
              text="Update guide"
              variant="flat"
              @click="updateGuide"
            >
              Update guide
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>